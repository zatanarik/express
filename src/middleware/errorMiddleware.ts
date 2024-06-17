import ApiError from '../error/apiError';
import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: Error, request: Request, responce: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    console.log(err, new Date());
    return responce.status(err.status).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
    });
  }
  console.log(err, new Date());
  return responce.status(500).json({
    success: false,
    message: 'Непредивденная ошибка',
  });
};
