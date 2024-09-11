import express from 'express';
import GoodsController from '../controllers/goods.controller';

const routerGoods = express.Router();

routerGoods.post('/', GoodsController.createGood);

routerGoods.get('/:id', GoodsController.findGoodById);

routerGoods.delete('/:id', GoodsController.deleteGoodById);

routerGoods.put('/:id', GoodsController.updateGoodById);

export = routerGoods;
