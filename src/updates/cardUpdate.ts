import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import Card from '../models/card';
import NotFoundError from '../errors/notFoundError';
import {
  STATUS_SUCCESS,
  CARD_NOT_FOUND_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
} from '../utils/consts';
import ValidationError from '../errors/validationError';

const modifyCardLikes = (operation: '$addToSet' | '$pull') => async (
  req: Request & { user?: JwtPayload | string },
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const userId = (req.user as { _id: string | ObjectId })._id;

    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { [operation]: { likes: userId } },
      { new: true },
    );

    if (!updatedCard) {
      next(new NotFoundError(CARD_NOT_FOUND_MESSAGE));
    }

    res.status(STATUS_SUCCESS).send(updatedCard);
  } catch (error : any) {
    if (error.name === 'CastError') {
      const validationError = new ValidationError(VALIDATION_ERROR_MESSAGE);
      next(validationError);
    }
    next(error);
  }
};

export default modifyCardLikes;
