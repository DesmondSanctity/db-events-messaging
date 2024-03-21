import {
 createRent,
 deleteRent,
 getRent,
 getRents,
 updateRent,
} from '../services/rentService.js';
import { AppResponse } from '../utils/response-handler.js';

export const create = async (req, res) => {
 try {
  const rent = await createRent(req, res);

  if (rent)
   new AppResponse(
    'success',
    'Rent record created successfully',
    { rent },
    200
   ).send(res);
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};

export const getAll = async (req, res) => {
 try {
  const rents = await getRents(req, res);

  if (rents)
   new AppResponse(
    'success',
    'Rents fetched successfully',
    { rents },
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
  const rent = await getRent(req, res);

  if (rent)
   new AppResponse('success', 'Rent fetched successfully', { rent }, 200).send(
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
  const rent = await updateRent(req, res);

  if (rent)
   new AppResponse('success', 'Rent updated successfully', { rent }, 200).send(
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
  const rent = await deleteRent(req, res);

  if (rent)
   new AppResponse('success', 'Rent deleted successfully', { rent }, 200).send(
    res
   );
 } catch (error) {
  res.status(400).json({
   status: error.status,
   message: error.message,
  });
 }
};
