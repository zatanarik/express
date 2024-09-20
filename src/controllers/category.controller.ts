//category
import { Request, Response, NextFunction } from 'express';
import CategoryService from '../services/category.service';
import ApiError from '../error/apiError';

class CategoryController {
  async createCategory(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.body.name) throw ApiError.BadRequest("name");

      const name = request.body.name;
      const result = await CategoryService.createCategory(name);

      return response.status(201).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async findCategoryById(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.body.id) throw ApiError.BadRequest("id");

      const id = +request.params.id;
      const result = await CategoryService.findCategoryById(id);
      console.log(result);

      return response.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteCategoryById(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.body.id) throw ApiError.BadRequest("id");

      const id = +request.params.id;
      await CategoryService.deleteCategoryById(id);
      return response.status(200).send({
        success: true,
        data: {
          id: id,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  //todo
  async findGoodsByCategoryId(request: Request, response: Response, next: NextFunction) {
    try {
      const id = +request.params.id;
      const result = await CategoryService.findGoodsByCategoryId(id);

      return response.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }

  async updateCategoryById(request: Request, response: Response, next: NextFunction) {
    try {
      const name: string = request.body.name;
      const id = +request.params.id;
      const input = { id: id, name: name };
      const result = await CategoryService.updateCategoryById(id, input);

      return response.status(200).send({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new CategoryController();
