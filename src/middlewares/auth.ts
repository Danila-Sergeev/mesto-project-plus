import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { STATUS_UNAUTHORIZED, AUTHORIZATION_NEEDED_MESSAGE } from '../utils/consts';
import { jwtSecret } from '../controllers/users';

const AuthorizedUser = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(STATUS_UNAUTHORIZED)
      .send({ message: AUTHORIZATION_NEEDED_MESSAGE });
  }

  const token = authorization.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload;
    return next();
  } catch {
    return res.status(STATUS_UNAUTHORIZED).send({ message: AUTHORIZATION_NEEDED_MESSAGE });
  }
};

export default AuthorizedUser;
