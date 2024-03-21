import {
 deleteBook,
 getBook,
 getBooks,
 updateBook,
} from '../services/bookService.js';
import { AppResponse } from '../utils/response-handler.js';

export const getAll = async (req, res) => {
 try {
  const books = await getBooks(req, res);

  if (books)
   new AppResponse(
    'success',
    'Books fetched successfully',
    { books },
    200
   ).send(res);
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};

export const getOne = async (req, res) => {
 try {
  const book = await getBook(req, res);

  if (book)
   new AppResponse('success', 'Book fetched successfully', { book }, 200).send(
    res
   );
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};

export const updateOne = async (req, res) => {
 try {
  const book = await updateBook(req, res);

  if (book)
   new AppResponse('success', 'Book updated successfully', { book }, 200).send(
    res
   );
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};

export const deleteOne = async (req, res) => {
 try {
  const book = await deleteBook(req, res);

  if (book)
   new AppResponse('success', 'Book deleted successfully', { book }, 200).send(
    res
   );
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};
