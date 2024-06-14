import { Request, Response, NextFunction} from 'express'
import TelegramService from '../services/telegram.service';
class TelegramController {
    async newOrder(request: Request, response: Response, next: NextFunction){
        const name = request.body.name;
        const phoneNumber = request.body.phoneNumber;
        const text = `*Новый заказ*%0AИмя: ${name}%0AНомер телефона: ${phoneNumber}`;
        const url = `https://api.telegram.org/bot7067811500:AAGBpc8HzNFBGlCF39QBqcWsOUnmZkze3f4/sendMessage?chat_id=-4264904666&text=${text}&parse_mode=Markdown`;
        try {
            throw new Error();
            const fetch = await TelegramService.neworder(url);
            //console.log(result);
            const result = {
                success:fetch.ok
            }
            response.status(200).json(result);
        } catch(err){
            next(err);
        }
        
    }
}

export default new TelegramController()