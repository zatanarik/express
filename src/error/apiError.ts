class ApiError extends Error {
    status;
    errors;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(status: any, message: any, errors = []) {
      super(message);
      this.status = status;
      this.errors = errors;
    }
  
    static UnauthorizedError() {
      return new ApiError(401, "Пользователь не авторизован");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static BadRequest(message: any, errors = []) {
      return new ApiError(404, message, errors);
    }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static InternalServerError(message: any, errors = []) {
      return new ApiError(500, message, errors);
    }
  }
  
  export default ApiError;