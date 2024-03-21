import express from 'express';
import http from 'http';
import cors from 'cors';
import { port } from '../src/config/app.config.js';
import { AppError } from '../src/utils/response-handler.js';
import '../src/models/index.js';


async function startServer() {
 const app = express();
 const server = http.createServer(app);

 app.use(cors());

 app.use(express.json());
 app.disable('x-powered-by'); // less hackers know about our stack

 // Your middleware function to handle errors
 const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
   return next(err);
  }

  if (err instanceof AppError) {
   // If it's a CustomError, respond with the custom status code and message
   return res
    .status(err.statusCode)
    .json({ status: err.status, error: err.message });
  } else {
   // If it's an unknown error, respond with a 500 status code and a generic error message
   return res.status(500).json({ error: 'Something went wrong.' });
  }
 };

 // Applying the error handling middleware
 app.use(errorHandler);

 /** HTTP GET Request */
 app.get('/', (req, res) => {
  res.status(201).json('Home GET Request');
 });



 server.listen(port, () => {
  console.info(`
      ###########################################
      Server is currently running at port ${port}
      ###########################################`);
 });
}

startServer();
