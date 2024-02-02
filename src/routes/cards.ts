import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';
import AuthorizedUser from '../middlewares/auth';
import { cardIdValidator, createCardValidator } from '../utils/validator';

const cardsRouter = Router();

cardsRouter.get('/', AuthorizedUser, getCards);
cardsRouter.post('/', AuthorizedUser, createCardValidator, createCard);
cardsRouter.delete('/:id', AuthorizedUser, cardIdValidator, deleteCard);
cardsRouter.put('/:id/likes', cardIdValidator, likeCard);
cardsRouter.delete('/:id/likes', cardIdValidator, dislikeCard);

export default cardsRouter;
