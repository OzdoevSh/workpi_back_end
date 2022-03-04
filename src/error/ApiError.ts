class ApiError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  function badRequest(message: JSON) {
    return new ApiError(404, message);
  }

  function internal(message: JSON) {
    return new ApiError(500, message);
  }

  function forbidden(message: JSON) {
    return new ApiError(403, message);
  }
}

export default ApiError;