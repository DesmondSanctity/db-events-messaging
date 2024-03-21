import { Users } from '../models/index.js';
import { getPagination } from '../utils/paginate-query.js';
import { AppError } from '../utils/response-handler.js';

export const getUsers = async (req, res, next) => {
 try {
  const results = getPagination(Users, {
   ...req.query,
   attributes: { exclude: ['password'] },
   where: {},
   order: [],
  });

  if (results) {
   return results;
  } else {
   throw new AppError('failed', 'Failed to get users record', 400);
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
   const user = await Users.findOne({
    where: {
     userId: req.params.id,
    },
   });

   if (user) {
    return user;
   } else {
    throw new AppError('failed', 'Failed to get your record, refresh!', 400);
   }
  } else {
   throw new AppError('failed', 'Invalid user! Try logging in again', 400);
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
   const user = await Users.update(req.body, {
    where: {
     userId: req.body.userId,
    },
   });

   if (user) {
    return user;
   } else {
    throw new AppError('failed', 'Failed to update your record, refresh!', 400);
   }
  } else {
   throw new AppError('failed', 'Invalid user! Try logging in again', 400);
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
   const user = await Users.destroy({
    where: {
     userId: req.params.id,
    },
   });

   if (user) {
    return user;
   } else {
    throw new AppError('failed', 'Failed to delete your record, refresh!', 400);
   }
  } else {
   throw new AppError('failed', 'Invalid user! Try logging in again', 400);
  }
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};
