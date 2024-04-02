import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Users } from '../models/index.js';
import { baseURL, jwtSecret, jwtExpires } from '../config/app.config.js';
import { AppError } from '../utils/response-handler.js';

export const signupUser = async (req, res) => {
 try {
  const { email, phoneNumber, fullName, password, userType } = req.body;

  // Check if email already exists
  const existEmail = await Users.findOne({ email });

  if (existEmail) {
   throw new AppError('failed', 'Email already exists. Try again', 400);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = new Users({
   email,
   phoneNumber,
   password: hashedPassword,
   fullName,
   userType: userType || 'reader',
   isVerified: false,
  });

  // Save to database
  await user.save();

  // Omit sensitive fields
  const newUser = await Users.findById(user._id).select('-password');

  // Return new user
  return { user: newUser };
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};

export const loginUser = async (req, res) => {
 try {
  // Find user by email
  const user = await Users.findOne({ email: req.body.email });
  if (!user) {
   throw new AppError('failed', 'User with this email not found', 400);
  }

  // Check password
  const validPassword = bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
   throw new AppError('failed', 'Invalid email or password', 400);
  }

  // Create JWT
  const token = jwt.sign({ userId: user._id }, jwtSecret, {
   expiresIn: jwtExpires,
  });

  // Omit sensitive fields
  user.password = null;

  // Return user and token
  return { user, token };
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};

export const forgetPasswordUser = async (req, res) => {
 const { email } = req.body;

 try {
  // Find user by email
  const user = await Users.findOne({ email });
  if (!user) {
   throw new AppError('failed', 'Email does not exist', 400);
  }

  // Create reset token
  const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '120' });

  // Construct reset url
  const resetUrl = `${baseURL}/auth/reset-password/${token}`;

  // return resetUrl
  return resetUrl;
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};

export const resetPasswordUser = async (req, res) => {
 const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

 try {
  if (!req.user) {
   throw new AppError('failed', 'Unauthorized. Try again', 400);
  }

  // Find user by id in token
  const user = await Users.findById(req.user.userId);

  if (!user) {
   throw new AppError('failed', 'User not found', 404);
  }

  // Update password
  user.password = hashedPassword;
  await user.save();

  // Return updated user
  return user;
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};

export const changePasswordUser = async (req, res) => {
 const { oldPassword, newPassword } = req.body;

 try {
  if (!req.user) {
   throw new AppError('failed', 'Unauthorized', 401);
  }

  const user = await Users.findById(req.user.userId);

  if (!user) {
   throw new AppError('failed', 'User not found', 404);
  }

  // Validate old password
  const validPassword = bcrypt.compare(oldPassword, user.password);

  if (!validPassword) {
   throw new AppError('failed', 'Old password is incorrect', 400);
  }

  // Hash new password
  const hashedNewPassword = bcrypt.hash(newPassword, 10);

  // Update password field
  user.password = hashedNewPassword;

  await user.save();

  // Return success response
  return user;
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};
