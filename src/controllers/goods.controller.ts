//category
import { Request, Response, NextFunction} from 'express'
import GoodsService from '../services/goods.service';

class GoodsController {
  
  async createGood(request: Request, response: Response, next: NextFunction) { 
    const category_id = request.body.category_id;
    const name = request.body.name;
    const description = request.body.description;
    const input = {category_id: category_id, name: name, description:description};

    try {
         const result = await GoodsService.creategGood(input);
         return response.status(201).json({
          success:true,
          data:result[0]
         });
    } catch (err) {
        next(err)
    }
  };

  async findGoodById(request: Request, response: Response, next: NextFunction) { 
    const id = request.params.id as unknown as number;

    try {
        const result = await GoodsService.findGoodById(id);
        return response.status(200).json({
          success:true,
          data:result[0]
         });
    } catch (err) {
        next(err)
    }
  }; 

  async deleteGoodById(request: Request, response: Response, next: NextFunction) { 
    const id = request.params.id as unknown as number;

    try {
        await GoodsService.deleteGoodById(id);
        return response.status(204).send({
          success:true,
          data:{
            id:id
          }
         });
    } catch (err) {
        next(err)
    }
  };

  async updateGoodById(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id as unknown as number;
    const category_id = request.body.category_id;
    const name = request.body.name;
    const description = request.body.description;
    const input = {category_id: category_id, name: name, description:description};

    try {
        const result = await GoodsService.updateGoodById(id, input);
        return response.status(200).json({
          success:true,
          data:result[0]
         });
    } catch (err) {
        next(err)
    }
  };
}

export default new GoodsController()