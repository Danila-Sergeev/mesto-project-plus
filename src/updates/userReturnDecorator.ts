import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../errors/notFoundError';
import ValidationError from '../errors/validationError';
import { UserReturnType } from '../utils/types';
import {
  STATUS_SUCCESS,
  USER_NOT_FOUND_MESSAGE,
  INVALID_DATA_MESSAGE,
} from '../utils/consts';

const UserReturnDecorator = (
  // eslint-disable-next-line no-unused-vars
  returnLogic: (req: Request) => Promise<UserReturnType>,
) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await returnLogic(req);
    if (!user) throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
    return res.status(STATUS_SUCCESS).send(user);
  } catch (error) {
    if (error instanceof Error && error.name === 'NotFoundError') {
      throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
    }
    if (error instanceof mongoose.Error.CastError) {
      const validationError = new ValidationError(INVALID_DATA_MESSAGE, error);
      return next(validationError);
    }
    return next(error);
  }
};

export default UserReturnDecorator;
