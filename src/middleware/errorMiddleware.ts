import ApiError from "../error/apiError";
import { Request, Response} from 'express'

export default (err: Error, request: Request, response: Response) => {
  console.log(err);

  if (err instanceof ApiError) {
    return response.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  }

  return response.status(500).json({
    message: "Непредивденная ошибка",
  });
};