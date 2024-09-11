import express from 'express';
import TelegramController from '../controllers/telegram.controller';

const routerTelegram = express.Router();

routerTelegram.post('/', TelegramController.newOrder);

export default routerTelegram;
