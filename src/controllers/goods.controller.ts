//category
import { Request, Response, NextFunction } from 'express';
import GoodsService from '../services/goods.service';
import { CreateGoodDTO } from '../types/createGood.dto';

class GoodsController {
  async createGood(request: Request, response: Response, next: NextFunction) {
    try {
      const category_id: number = request.body.category_id;
      const name: string = request.body.name;
      const description: string = request.body.description;
      const input: CreateGoodDTO = { 
        category_id: category_id,
        name: name,
        description: description
      };

      const result = await GoodsService.creategGood(input);
      return response.status(201).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async findGoodById(request: Request, response: Response, next: NextFunction) {
    try {
      const id: number = +request.params.id;

      const result = await GoodsService.findGoodById(id);
      return response.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteGoodById(request: Request, response: Response, next: NextFunction) {
    try {
      const id: number = +request.params.id;

      await GoodsService.deleteGoodById(id);
      return response.status(204).send({
        success: true,
        data: {
          id: id,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async updateGoodById(request: Request, response: Response, next: NextFunction) {
    try {
      const id: number = +request.params.id;
      const category_id: number = request.body.category_id;
      const name: string = request.body.name;
      const description: string = request.body.description;
      const input: CreateGoodDTO = {
        category_id: category_id,
        name: name,
        description: description
      };

      const result = await GoodsService.updateGoodById(id, input);
      return response.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new GoodsController();
