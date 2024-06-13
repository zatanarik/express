import express from 'express'
import categoryController from '../src/category/category.controller';

const routerCategory = express.Router();

routerCategory.post("/", categoryController.createCategory);

routerCategory.get("/:id", categoryController.findCategoryById); 

routerCategory.delete("/:id", categoryController.deleteCategoryById);

routerCategory.get("/goods/:id", categoryController.findGoodsByCategoryId);  

routerCategory.put("/:id", categoryController.updateCategoryById);

export = routerCategory;