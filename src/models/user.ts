import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  DEFAULT_ABOUT_VALUE, DEFAULT_AVATAR_LINK,
  DEFAULT_USER_NAME, WRONG_EMAIL_PASSWORD_MESSAGE,
} from '../utils/consts';
import { IUser } from '../utils/types';
import { emailValidationOptions, urlValidationOptions } from '../utils/validator';
import UnauthorizedError from '../errors/unauthorizedError';

interface IUserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials: (email: string, password: string) => Promise<Document<unknown, any, IUser>>
}

const UserSchema = new mongoose.Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      default: DEFAULT_USER_NAME,
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 200,
      default: DEFAULT_ABOUT_VALUE,
    },
    avatar: {
      type: String,
      required: true,
      validate: urlValidationOptions,
      default: DEFAULT_AVATAR_LINK,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: emailValidationOptions,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

UserSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(WRONG_EMAIL_PASSWORD_MESSAGE));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(WRONG_EMAIL_PASSWORD_MESSAGE));
          }
          return user;
        });
    });
});

export default mongoose.model<IUser, IUserModel>('user', UserSchema);
