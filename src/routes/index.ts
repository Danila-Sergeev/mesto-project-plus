import { Router } from 'express';
import { INVALID_DATA_MESSAGE } from '../utils/consts';
import cardsRouter from './cards';
import userRouter from './user';
import authRouter from './authRoute';
import NotFoundError from '../errors/notFoundError';

const router = Router();
router.use('/users', userRouter);
router.use('/cards', cardsRouter);
router.use(authRouter);

router.use(() => {
  throw new NotFoundError(INVALID_DATA_MESSAGE);
});

export default router;
