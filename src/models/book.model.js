import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const BookSchema = new mongoose.Schema({
 title: {
  type: String,
  required: [true, 'Please provide a title for the book'],
 },
 category: {
  type: String,
  required: [true, 'Please provide a category for the book'],
 },
 coverImageUrl: {
  type: String,
  unique: false,
 },
 isbnNumber: {
  type: String,
  required: [true, 'book record should have an isbn number'],
 },
 author: {
  type: Schema.Types.ObjectId,
  ref: 'Users',
  required: [true, 'book record should have an author'],
 },
});



export default mongoose.model('Books', BookSchema);

