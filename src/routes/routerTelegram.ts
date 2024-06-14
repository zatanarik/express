import express from 'express'
import ControllerTelegram from '../telegram/telegram.controller';

const routerTelegram = express.Router();
 
routerTelegram.post("/telegram", ControllerTelegram.newOrder);

export default routerTelegram;