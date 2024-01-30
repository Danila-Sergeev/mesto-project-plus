import { Router } from 'express';
import {
  getUsers, getUserById, updateUserInfo, updateUserAvatar, getAuthUser,
} from '../controllers/users';
import AuthorizedUser from '../middlewares/auth';

const userRouter = Router();

userRouter.get('/', AuthorizedUser, getUsers);

userRouter.get('/:id', AuthorizedUser, getUserById);
userRouter.get('/me', AuthorizedUser, getAuthUser);

userRouter.patch('/me', AuthorizedUser, updateUserInfo);
userRouter.patch('/me/avatar', AuthorizedUser, updateUserAvatar);

export default userRouter;
