import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import router from './routes';
import { errorLogger, requestLogger } from './logger/expressLogger';
import ErrorHub from './errors/errorHub';
import user from './models/user';
import card from './models/card';
import auth from './middlewares/auth';
import { createUser, login } from './controllers/users';

require('dotenv').config();

const app = express();
const { PORT = 3000 } = process.env;
app.use(requestLogger);
app.use(express.json());
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use(router);
app.use(errorLogger);
app.use(ErrorHub);

const connect = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
  await user.init();
  await card.init();
  await app.listen(PORT);
};

connect();
