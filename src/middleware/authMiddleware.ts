import ApiError from '../error/apiError';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.service';

interface JwtPayload {
  id: number;
  email: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export default (request: any, responce: Response, next: NextFunction) => {
  try {
    const authorizationHeader = request.headers.token;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split('%20')[1];

    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as jwt.Secret;
    const userDataJWT = jwt.verify(accessToken, JWT_ACCESS_SECRET) as JwtPayload;
    if (!userDataJWT) {
      return next(ApiError.UnauthorizedError());
    }
    const user = UserService.findUserByEmail(userDataJWT.email);
    request.user = user;
    next();
  } catch (err) {
    return next(ApiError.UnauthorizedError());
  }
};
