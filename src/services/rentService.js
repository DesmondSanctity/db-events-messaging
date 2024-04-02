import { Rents } from '../models/index.js';
import { getPagination } from '../utils/paginate-query.js';
import { AppError } from '../utils/response-handler.js';

export const createRent = async (req, res) => {
 const { returnDate, author, book } = req.body;

 try {
  const rent = new Rents({
   rentDate: Date.now(),
   returnDate,
   isOverdue: false,
   author,
   borrower: req.user.userId,
   book,
  });

  await rent.save();

  if (rent) {
   return rent;
  } else {
   throw new AppError('failed', 'Failed to create rent', 400);
  }
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};

export const getRents = async (req, res, next) => {
 try {
  const results = getPagination(Rents, {
   ...req.query,
   populate: {
    path: 'author borrower',
    select: '-password',
   },
   where: {},
   sort: { createdat: -1 }, // sort order
  });

  if (results) {
   return results;
  } else {
   throw new AppError('failed', 'Failed to get rents', 400);
  }
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};

export const getRent = async (req, res) => {
 try {
  if (req.user && req.params.id) {
   const rent = await Rents.findById(req.params.id);

   if (rent) {
    return rent;
   } else {
    throw new AppError('failed', 'Failed to get rent', 400);
   }
  } else {
   throw new AppError('failed', 'Invalid user or rent ID', 400);
  }
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};

export const updateRent = async (req, res) => {
 try {
  if (req.user && req.params.id) {
   const rent = await Rents.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true,
   });

   if (rent) {
    return rent;
   } else {
    throw new AppError('failed', 'Failed to update rent', 400);
   }
  } else {
   throw new AppError('failed', 'Invalid user or rent ID', 400);
  }
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};

export const deleteRent = async (req, res) => {
 try {
  if (req.user && req.params.id) {
   const rent = await Rents.findByIdAndDelete({_id: req.params.id});

   if (rent) {
    return rent;
   } else {
    throw new AppError('failed', 'Failed to delete rent', 400);
   }
  } else {
   throw new AppError('failed', 'Invalid user or rent ID', 400);
  }
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};
