import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import mongoose, { ObjectId } from 'mongoose';
import Card from '../models/card';
import {
  STATUS_SUCCESS,
  STATUS_CREATED,
  CARD_NOT_FOUND_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
  CARD_DELITION_SUCCESS_MESSAGE,
  STATUS_FORBIDDEN_MESSAGE,
} from '../utils/consts';
import modifyCardLikes from '../updates/cardUpdate';
import ValidationError from '../errors/validationError';
import NotFoundError from '../errors/notFoundError';
import ForbiddenError from '../errors/forbiddenError';

export const getCards = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    return res.status(STATUS_SUCCESS).send(cards);
  } catch (error) {
    return next(error);
  }
};

export const createCard = async (
  req: Request & { user?: JwtPayload | string },
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, link } = req.body;
    const owner = (req.user as { _id: string | ObjectId })._id;
    const newCard = await Card.create({ name, link, owner });
    return res.status(STATUS_CREATED).send(newCard);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationError = new ValidationError(VALIDATION_ERROR_MESSAGE, error);
      return next(validationError);
    }
    return next(error);
  }
};

export const deleteCard = async (
  req: Request & { user?: JwtPayload | string },
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const card = await Card.findById(id);

    if (!card) {
      throw new NotFoundError(CARD_NOT_FOUND_MESSAGE);
    }

    const userId = (req.user as { _id?: string | ObjectId })._id;

    if (card.owner.toString() !== userId) {
      throw new ForbiddenError(STATUS_FORBIDDEN_MESSAGE);
    }

    await Card.deleteOne({ _id: card._id });

    return res.status(STATUS_SUCCESS).send({ message: CARD_DELITION_SUCCESS_MESSAGE });
  } catch (error) {
    return next(error);
  }
};
export const likeCard = modifyCardLikes('$addToSet');
export const dislikeCard = modifyCardLikes('$pull');
