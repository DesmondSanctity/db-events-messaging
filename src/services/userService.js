import { Users } from '../models/index.js';
import { getPagination } from '../utils/paginate-query.js';
import { AppError } from '../utils/response-handler.js';

export const getUsers = async (req, res, next) => {
 try {
  const results = await getPagination(Users, {
   ...req.query,
   select: '-password', // exclude password
   where: {},
   sort: { createdAt: -1 }, // sort order
  });

  if (results) {
   return results;
  } else {
   throw new AppError('failed', 'Failed to get users', 400);
  }
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};

export const getUser = async (req, res) => {
 try {
  if (req.user && req.params.id) {
   const user = await Users.findById(req.params.id).select('-password');

   if (user) {
    return user;
   } else {
    throw new AppError('failed', 'Failed to get user', 400);
   }
  } else {
   throw new AppError('failed', 'Invalid user', 400);
  }
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};

export const updateUser = async (req, res) => {
 try {
  if (req.user && req.user.userId == req.params.id) {
   const user = await Users.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true,
    select: '-password',
   });

   if (user) {
    return user;
   } else {
    throw new AppError('failed', 'Failed to update user', 400);
   }
  } else {
   throw new AppError('failed', 'Invalid user', 400);
  }
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};

export const deleteUser = async (req, res) => {
 try {
  if (req.user && req.params.id) {
   const user = await Users.findOneAndDelete({_id: req.params.id});

   if (user) {
    return user;
   } else {
    throw new AppError('failed', 'Failed to delete user', 400);
   }
  } else {
   throw new AppError('failed', 'Invalid user', 400);
  }
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};
