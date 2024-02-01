import mongoose, { ObjectId } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { UserData, UpdateUserData } from '../utils/types';
import User from '../models/user';
import {
  STATUS_SUCCESS,
  VALIDATION_ERROR_MESSAGE,
} from '../utils/consts';
import ValidationError from '../errors/validationError';

const updateUser = async (
  id: string | ObjectId,
  data: UpdateUserData,
) => User.findByIdAndUpdate(id, data, {
  new: true,
  runValidators: true,
});
// eslint-disable-next-line no-unused-vars
const userUpdate = (dataExtractor: (req: Request) => UserData) => async (
  req: Request & { user?: JwtPayload | string },
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = dataExtractor(req);
    const userId = await (req.user as { _id: string | ObjectId })._id;
    const updatedUser = await updateUser(userId, data);
    return res.status(STATUS_SUCCESS).send(updatedUser);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationError = new ValidationError(VALIDATION_ERROR_MESSAGE, error);
      return next(validationError);
    }
    return next(error);
  }
};

export default userUpdate;
