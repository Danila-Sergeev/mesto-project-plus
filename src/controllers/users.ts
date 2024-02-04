import { NextFunction, Request, Response } from 'express';
import mongoose, { ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {
  STATUS_CREATED,
  STATUS_SUCCESS,
  USER_EXISTS_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
} from '../utils/consts';
import User from '../models/user';
import userUpdate from '../updates/userUpdate';
import ValidationError from '../errors/validationError';
import UserExistsError from '../errors/userExists';
import UserReturnDecorator from '../updates/userReturnDecorator';

export const jwtSecret = process.env.JWT_SECRET as string;

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find({});
    return res.status(STATUS_SUCCESS).send(users);
  } catch (error) {
    return next(error);
  }
};

export const getUserById = UserReturnDecorator(async (req: Request) => {
  const { id } = req.params;
  return User.findById(id);
});

export const getAuthUser = UserReturnDecorator(async (
  req: Request & { user?: JwtPayload| string },
) => {
  const userId = (req.user as { _id: string | ObjectId })._id;
  return User.findById(userId);
});

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name, about, avatar, email, password: hash,
    });

    return res.status(STATUS_CREATED).send(newUser);
  } catch (error : any) {
    if (error.code === 11000) {
      next(new UserExistsError(USER_EXISTS_MESSAGE));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationError = new ValidationError(VALIDATION_ERROR_MESSAGE);
      return next(validationError);
    }
    return next(error);
  }
};

export const updateUserInfo = userUpdate((req: Request) => {
  const { name, about } = req.body;
  return { name, about };
});

export const updateUserAvatar = userUpdate((req: Request) => {
  const { avatar } = req.body;
  return { avatar };
});

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((userInformation) => {
      res
        .send({
          token: jwt.sign({ _id: userInformation._id }, 'super-strong-secret', { expiresIn: '7d' }),
        });
    })
    .catch(next);
};
