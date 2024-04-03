import express from 'express';
import http from 'http';
import cors from 'cors';
import connect from './config/db.config.js';
import { port } from '../src/config/app.config.js';
import { errorHandler } from '../src/utils/response-handler.js';
import '../src/utils/cron.js';
import bookRouter from './routes/book.js';
import rentRouter from './routes/rent.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';

async function startServer() {
 const app = express();
 const server = http.createServer(app);

 app.use(cors());

 app.use(express.json());
 app.disable('x-powered-by'); // less hackers know about our stack

 // Applying the error handling middleware
 app.use(errorHandler);

 /** HTTP GET Request */
 app.get('/', (req, res) => {
  res.status(201).json('Home GET Request');
 });

 app.use('/api/v1/auth', authRouter);
 app.use('/api/v1/users', userRouter);
 app.use('/api/v1/books', bookRouter);
 app.use('/api/v1/rents', rentRouter);

 /** start server only when we have valid connection */
 connect()
  .then(() => {
   try {
    server.listen(port, () => {
     console.info(`
      ###########################################
      Server is currently running at http://localhost:${port}
      ###########################################`);
    });
   } catch (error) {
    console.log('Cannot connect to the server', error);
   }
  })
  .catch((error) => {
   console.log('Invalid database connection...!', error);
  });
}

startServer();
