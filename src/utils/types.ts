import { ObjectId } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

export interface ICard {
  name: string;
  link: string;
  owner: ObjectId;
  likes: ObjectId[];
  createdAt: Date;
}
export type UserData = { name: string; about: string } | { avatar: string };

export interface UpdateUserData {
  name?: string;
  about?: string;
  avatar?: string;
}

export type UserReturnType = string | JwtPayload | { _id: string | ObjectId } | null;

export interface ExtendedError extends Error {
  statusCode?: number;
}
