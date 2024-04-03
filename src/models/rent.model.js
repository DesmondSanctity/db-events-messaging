import mongoose, { Schema } from 'mongoose';
import { overdueEvent } from '../events/overdue.js';
import { Rents } from './index.js';

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

// Add pre hook on update
RentSchema.post('save', async function () {
 // Get updated doc
 const updatedDoc = await Rents.findById(this._id);

 // Check if isOverdue changed to true
 if (updatedDoc.isOverdue === true) {
  // Call overdueEvent
  await overdueEvent(updatedDoc);
 }
});

export default mongoose.model('Rents', RentSchema);
