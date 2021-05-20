class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);

    if (Error.captureStackTrace) Error.captureStackTrace(this, AppError);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true
  }
}

module.exports = AppError;
