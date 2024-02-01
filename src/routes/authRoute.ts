import { Router } from 'express';
import { createUser, login } from '../controllers/users';

const authRouter = Router();

authRouter.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

authRouter.post('/signin', login);
authRouter.post('/signup', createUser);

export default authRouter;
