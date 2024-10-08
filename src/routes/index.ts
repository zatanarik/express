import express from 'express';
import routerCategory from './routerCategory';
import routerGoods from './routerGoods';
import routerTelegram from './routerTelegram';
import routerUsers from './routerUsers';

const routerApp = express.Router();

routerApp.use('/category', routerCategory);
routerApp.use('/goods', routerGoods);
routerApp.use('/users', routerUsers);
routerApp.use('/telegram', routerTelegram);

export default routerApp;
