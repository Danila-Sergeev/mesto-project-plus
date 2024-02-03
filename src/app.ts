import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import router from './routes';
import { errorLogger, requestLogger } from './logger/expressLogger';
import ErrorHub from './errors/errorHub';
import auth from './middlewares/auth';
import { createUser, login } from './controllers/users';
import { signInValidator, signUpValidator } from './utils/validator';

require('dotenv').config();

const app = express();
const { PORT = 3000 } = process.env;
app.use(requestLogger);
app.use(express.json());
app.post('/signin', signInValidator, login);
app.post('/signup', signUpValidator, createUser);
app.use(auth);
app.use(router);
app.use(errorLogger);
app.use(ErrorHub);

const connect = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
  await app.listen(PORT);
};

connect();
