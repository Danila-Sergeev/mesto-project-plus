import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { AUTHORIZATION_NEEDED_MESSAGE } from '../utils/consts';
import { jwtSecret } from '../controllers/users';
import UnauthorizedError from '../errors/unauthorizedError';

const AuthorizedUser = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(AUTHORIZATION_NEEDED_MESSAGE);
  }

  const token = authorization.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload;
    return next();
  } catch (err) {
    return next(new UnauthorizedError(AUTHORIZATION_NEEDED_MESSAGE));
  }
};

export default AuthorizedUser;
