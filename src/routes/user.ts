import { Router } from 'express';
import {
  getUsers, getUserById, updateUserInfo, updateUserAvatar, getAuthUser,
} from '../controllers/users';
import AuthorizedUser from '../middlewares/auth';
import { avatarValidator, profileValidator, userIdValidator } from '../utils/validator';

const userRouter = Router();

userRouter.get('/', AuthorizedUser, getUsers);

userRouter.get('/:id', userIdValidator, getUserById);
userRouter.get('/me', getAuthUser);

userRouter.patch('/me', profileValidator, updateUserInfo);
userRouter.patch('/me/avatar', avatarValidator, updateUserAvatar);

export default userRouter;
