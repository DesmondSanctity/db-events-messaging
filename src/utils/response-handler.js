export class AppError extends Error {
 constructor(status, message, statusCode) {
  super(message);
  this.name = this.constructor.name;
  this.status = status;
  this.statusCode = statusCode || 500;
  Error.captureStackTrace(this, this.constructor);
 }
}

export class AppResponse {
 constructor(status, message, data, statusCode) {
  this.data = data;
  this.message = message;
  this.status = status;
  this.statusCode = statusCode || 200;
 }

 send(res) {
  res.status(this.statusCode).json({
   status: this.status,
   message: this.message,
   data: this.data,
  });
 }
}

 // Your middleware function to handle errors
 export const errorHandler = (err, req, res, next) => {
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
