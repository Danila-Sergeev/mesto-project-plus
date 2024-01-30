import { NextFunction, Request, Response } from 'express';
import logger from '../logger/logger';
import { SERVER_ERROR_MESSAGE, STATUS_SERVER_ERROR } from '../utils/consts';
import { ExtendedError } from '../utils/types';

// eslint-disable-next-line no-unused-vars
const ErrorHub = (error: ExtendedError, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'production') {
    logger.error(error.message, { stack: error.stack, ...req });
  }
  // Отправка ответа пользователю
  res.status(error.statusCode || STATUS_SERVER_ERROR).json({
    status: 'error',
    message: error.message || SERVER_ERROR_MESSAGE,
  });
};

export default ErrorHub;
