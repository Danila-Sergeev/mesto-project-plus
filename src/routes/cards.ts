import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';
import { cardIdValidator, createCardValidator } from '../utils/validator';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCardValidator, createCard);
cardsRouter.delete('/:id', cardIdValidator, deleteCard);
cardsRouter.put('/:id/likes', cardIdValidator, likeCard);
cardsRouter.delete('/:id/likes', cardIdValidator, dislikeCard);

export default cardsRouter;
