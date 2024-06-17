import { Request, Response, NextFunction } from 'express';
import TelegramService from '../services/telegram.service';
import ApiError from '../error/apiError';
class TelegramController {
  async newOrder(request: Request, response: Response, next: NextFunction) {
    try {
      const name = request.body.name;
      const phoneNumber = request.body.phoneNumber;
      const text = `*Новый заказ*%0AИмя: ${name}%0AНомер телефона: ${phoneNumber}`;
      const url = `https://api.telegram.org/bot7067811500:AAGBpc8HzNFBGlCF39QBqcWsOUnmZkze3f4/sendMessage?chat_id=-4264904666&text=${text}&parse_mode=Markdown`;

      throw new Error();
      return next(ApiError.BadRequest('Ошибка в начале'));
      const fetch = await TelegramService.neworder(url);
      //console.log(result);
      const result = {
        success: fetch.ok,
      };
      response.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

export default new TelegramController();
