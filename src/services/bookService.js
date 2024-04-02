import { Books } from '../models/index.js';
import { generateCoverImageURL, generateIsbn } from '../utils/book-utils.js';
import { getPagination } from '../utils/paginate-query.js';
import { AppError } from '../utils/response-handler.js';

export const createBook = async (req, res) => {
 const { title, category } = req.body;

 try {
  const book = new Books({
   title,
   isbnNumber: await generateIsbn(title, req.user.userId),
   author: req.user.userId,
   category,
   coverImageUrl: await generateCoverImageURL(title),
  });

  await book.save();

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
   populate: {
    path: 'author',
    select: '-password',
   },
   where: {},
   sort: { createdAt: -1 },
  });

  if (results) {
   return results;
  } else {
   throw new AppError('failed', 'Failed to get books', 400);
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
   const book = await Books.findById(req.params.id)
   .populate('author', '-password')
   .exec();

   if (book) {
    return book;
   } else {
    throw new AppError('failed', 'Failed to get book!', 400);
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
   const book = await Books.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
   });

   if (book) {
    return book;
   } else {
    throw new AppError('failed', 'Failed to update book!', 400);
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
   const book = await Books.findOneAndDelete({_id: req.params.id});

   if (book) {
    return book;
   } else {
    throw new AppError('failed', 'Failed to delete book!', 400);
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
