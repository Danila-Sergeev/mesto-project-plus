import { NextFunction, Request, Response } from 'express';
import mongoose, { ObjectId } from 'mongoose';
import Card from '../models/card';
import {
  STATUS_SUCCESS,
  STATUS_CREATED,
  STATUS_NOT_FOUND,
  STATUS_BAD_REQUEST,
  CARD_NOT_FOUND_MESSAGE,
  INVALID_DATA_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
  CARD_DELITION_SUCCESS_MESSAGE,
} from '../utils/consts';
import modifyCardLikes from '../updates/cardUpdate';

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
  req: Request,
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
      return res
        .status(STATUS_BAD_REQUEST)
        .send({ message: VALIDATION_ERROR_MESSAGE });
    }
    return next(error);
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const card = await Card.findById(id);

    if (!card) {
      return res
        .status(STATUS_NOT_FOUND)
        .send({ message: CARD_NOT_FOUND_MESSAGE });
    }

    const userId = (req.user as { _id: string | ObjectId })._id;

    if (!userId || card.owner.toString() !== userId) {
      return res
        .status(STATUS_BAD_REQUEST)
        .send({ message: INVALID_DATA_MESSAGE });
    }

    await Card.deleteOne({ id: card._id });

    return res
      .status(STATUS_SUCCESS)
      .send({ message: CARD_DELITION_SUCCESS_MESSAGE });
  } catch (error) {
    return next(error);
  }
};
export const likeCard = modifyCardLikes('$addToSet');
export const dislikeCard = modifyCardLikes('$pull');
