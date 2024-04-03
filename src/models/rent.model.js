import mongoose, { Schema } from 'mongoose';

const RentSchema = new mongoose.Schema({
 rentDate: {
  type: Date,
  required: [true, 'Please provide a rent date'],
 },
 returnDate: {
  type: Date,
  required: [true, 'Please provide a return date for the rentage'],
 },
 isOverdue: {
  type: Boolean,
  default: false,
  unique: false,
 },
 book: {
  type: Schema.Types.ObjectId,
  ref: 'Books',
  required: [true, 'rent record should have a book'],
 },
 author: {
  type: Schema.Types.ObjectId,
  ref: 'Users',
  required: [true, 'rent record should have an author'],
 },
 borrower: {
  type: Schema.Types.ObjectId,
  ref: 'Users',
  required: [true, 'rent record should have a borrower'],
 },
});

export default mongoose.model('Rents', RentSchema);
