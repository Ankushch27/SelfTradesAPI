const { handleErrors } = require('../utils/errorHandler');

const sendErrorDev = (err, res) => {
  console.error('err modified', err);
  const { message, stack, status, statusCode } = err;
  res
    .status(statusCode)
    .json({ result: null, error: { status, message, ...err, stack } });
};

const sendErrorProd = (err, res) => {
  const { message, status, statusCode } = err;
  if (err.isOperational)
    return res.status(statusCode).json({ result: null, error: { status, message } });
  res
    .status(statusCode)
    .json({ result: null, error: { status, message: 'Something went wrong' } });
};

module.exports = (err, req, res, next) => {
  console.error('err', err.name);
  if (!err.isOperational) {
    error = handleErrors(err);
    if (process.env.NODE_ENV === 'dev') return sendErrorDev(error, res);
    sendErrorProd(error, res);
  }
  if (process.env.NODE_ENV === 'dev') return sendErrorDev(err, res);
  sendErrorProd(err, res);
};
