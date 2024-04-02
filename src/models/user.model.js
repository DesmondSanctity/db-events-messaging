import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new mongoose.Schema({
 email: {
  type: String,
  required: [true, 'Please provide unique email'],
  unique: [true, 'email Exist'],
 },
 password: {
  type: String,
  required: [true, 'Please provide a password'],
  unique: false,
 },
 phoneNumber: {
  type: String,
  required: [true, 'Please provide a unique phoneNumber'],
  unique: [true, 'phone number Exist'],
 },
 fullName: {
  type: String,
  unique: false,
 },
 userType: {
  type: String,
  enum: ['author', 'reader'],
  default: 'reader',
  unique: false,
 },
 isVerified: {
  type: Boolean,
  default: false,
 },
 books: [{ type: Schema.Types.ObjectId, ref: 'Books' }],
 rents: [{ type: Schema.Types.ObjectId, ref: 'Rents' }],
});

export default mongoose.model('Users', UserSchema);
