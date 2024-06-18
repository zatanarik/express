import express from 'express';
import categoryController from '../controllers/category.controller';
import authMiddleware from '../middleware/authMiddleware';

const routerCategory = express.Router();

routerCategory.post('/', categoryController.createCategory);

routerCategory.get('/:id', categoryController.findCategoryById);

routerCategory.delete('/:id', authMiddleware, categoryController.deleteCategoryById);

routerCategory.get('/goods/:id', categoryController.findGoodsByCategoryId);

routerCategory.put('/:id', categoryController.updateCategoryById);

export = routerCategory;
