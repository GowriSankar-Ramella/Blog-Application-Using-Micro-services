class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = []) {
      super(message);
      this.statusCode = statusCode;
      this.errors = errors;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default ApiError;
  