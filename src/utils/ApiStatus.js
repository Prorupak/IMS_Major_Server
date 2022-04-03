class ApiStatus extends Status {
  constructor(statusCode, message={}, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    }
    Status.captureStackTrace(this, this.constructor);
  }
}

export default ApiStatus;
