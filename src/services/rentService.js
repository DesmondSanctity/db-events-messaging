import { Rents } from '../models/index.js';
import { getPagination } from '../utils/paginate-query.js';
import { AppError } from '../utils/response-handler.js';

export const createRent = async (req, res) => {
 const { rentDate, returnDate, renter, bookId } = req.body;

 try {
  const rent = await Rents.create({
   rentDate,
   returnDate,
   isOverdue: false,
   renter,
   borrower: req.user.userId,
   bookId,
  });

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
   where: {},
   order: [],
  });

  if (results) {
   return results;
  } else {
   throw new AppError('failed', 'Failed to get rents record', 400);
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
   const rent = await Rents.findOne({
    where: {
     rentId: req.params.id,
    },
   });

   if (rent) {
    return rent;
   } else {
    throw new AppError('failed', 'Failed to get your record, refresh!', 400);
   }
  } else {
   throw new AppError('failed', 'Invalid user or rent!', 400);
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
   const rent = await Rents.update(req.body, {
    where: {
     rentId: req.body.rentId,
    },
   });

   if (rent) {
    return rent;
   } else {
    throw new AppError('failed', 'Failed to update your record, refresh!', 400);
   }
  } else {
   throw new AppError('failed', 'Invalid user or rent!', 400);
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
   const rent = await Rents.destroy({
    where: {
     rentId: req.params.id,
    },
   });

   if (rent) {
    return rent;
   } else {
    throw new AppError('failed', 'Failed to delete your record, refresh!', 400);
   }
  } else {
   throw new AppError('failed', 'Invalid user or rent!', 400);
  }
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};
