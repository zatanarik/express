import express from "express";
import routerCategory from "./routerCategory";
import routerGoods from "./routerGoods";

const routerApp = express.Router();

routerApp.use('/category', routerCategory);

routerApp.use('/goods', routerGoods);

export = routerApp;