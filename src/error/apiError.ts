class ApiError extends Error {
  success;
  status;
  errors;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(success: any, status: any, message: any, errors = []) {
    super(message);
    this.success = success;
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(false, 401, 'Пользователь не авторизован');
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static BadRequest(message: any, errors = []) {
    return new ApiError(false, 404, message, errors);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static InternalServerError(message: any, errors = []) {
    return new ApiError(false, 500, message, errors);
  }
}

export default ApiError;
