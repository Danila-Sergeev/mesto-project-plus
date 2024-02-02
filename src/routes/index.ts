import { NextFunction, Router } from 'express';
import { INVALID_DATA_MESSAGE } from '../utils/consts';
import cardsRouter from './cards';
import userRouter from './user';
import NotFoundError from '../errors/notFoundError';

const router = Router();
router.use('/users', userRouter);
router.use('/cards', cardsRouter);

router.use((next: NextFunction) => {
  next(new NotFoundError(INVALID_DATA_MESSAGE));
});

export default router;
