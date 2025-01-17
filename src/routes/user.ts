import { Router } from 'express';
import {
  getUsers, getUserById, updateUserInfo, updateUserAvatar, getAuthUser,
} from '../controllers/users';
import { avatarValidator, profileValidator, userIdValidator } from '../utils/validator';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getAuthUser);
userRouter.get('/:id', userIdValidator, getUserById);
userRouter.patch('/me', profileValidator, updateUserInfo);
userRouter.patch('/me/avatar', avatarValidator, updateUserAvatar);

export default userRouter;
