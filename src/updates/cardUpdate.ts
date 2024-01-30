import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import Card from '../models/card';
import NotFoundError from '../errors/notFoundError';
import {
  STATUS_SUCCESS,
  CARD_NOT_FOUND_MESSAGE,
} from '../utils/consts';

const modifyCardLikes = (operation: '$addToSet' | '$pull') => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = (req.user as { _id: string | ObjectId })._id;

    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { [operation]: { likes: userId } },
      { new: true },
    );

    if (!updatedCard) {
      throw new NotFoundError(CARD_NOT_FOUND_MESSAGE);
    }

    res.status(STATUS_SUCCESS).send(updatedCard);
  } catch (error : any) {
    if (error.name === 'CastError') {
      res.status(400).send('Недопустимый ID карточки');
      return;
    }
    next(error);
  }
};

export default modifyCardLikes;
