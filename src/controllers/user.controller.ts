import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';
import tokenService from '../services/token.service';
class UserController {
  async registrate(request: Request, response: Response, next: NextFunction) {
    try {
      const email: string = request.body.email;
      const password: string = request.body.password;

      const user = await UserService.createUser(email, password);

      const token = await tokenService.generateToken(user);
      console.log(token.accessToken);
      response.cookie('token', `${token.accessToken}`, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      response.status(201).json({ succes: true, data: user });
    } catch (err) {
      next(err);
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const email: string = request.body.email;
      const password: string = request.body.password;
      const userData = await UserService.login(email, password);
      response.cookie('token', userData.accessToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      response.status(201).json({ succes: true, data: userData.user });
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
