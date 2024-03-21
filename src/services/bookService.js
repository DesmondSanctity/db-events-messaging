import { Books } from '../models/index.js';
import { getPagination } from '../utils/paginate-query.js';
import { AppError } from '../utils/response-handler.js';


export const createBook = async (req, res) => {
 const {
  title,
  isbnNumber,
  author,
  category,
  coverImageURL,
 } = req.body;
 
 try {
  const book = await Books.create({
   title,
   isbnNumber,
   author,
   category,
   coverImageURL
  });

  if (book) {
   return book;
  } else {
   throw new AppError('failed', 'Failed to create book', 400);
  }
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};

export const getBooks = async (req, res, next) => {
 try {
  const results = getPagination(Books, {
   ...req.query,
   where: {},
   order: [],
  });

  if (results) {
   return results;
  } else {
   throw new AppError('failed', 'Failed to get books record', 400);
  }
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};

export const getBook = async (req, res) => {
 try {
  if (req.user && req.params.id) {
   const book = await Books.findOne({
    where: {
     bookId: req.params.id,
    },
   });

   if (book) {
    return book;
   } else {
    throw new AppError('failed', 'Failed to get your record, refresh!', 400);
   }
  } else {
   throw new AppError('failed', 'Invalid user or book!', 400);
  }
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};

export const updateBook = async (req, res) => {
 try {
  if (req.user && req.params.id) {
   const book = await Books.update(req.body, {
    where: {
     bookId: req.body.bookId,
    },
   });

   if (book) {
    return book;
   } else {
    throw new AppError('failed', 'Failed to update your record, refresh!', 400);
   }
  } else {
   throw new AppError('failed', 'Invalid user or book!', 400);
  }
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};

export const deleteBook = async (req, res) => {
 try {
  if (req.user && req.params.id) {
   const book = await Books.destroy({
    where: {
     bookId: req.params.id,
    },
   });

   if (book) {
    return book;
   } else {
    throw new AppError('failed', 'Failed to delete your record, refresh!', 400);
   }
  } else {
   throw new AppError('failed', 'Invalid user or book!', 400);
  }
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};
