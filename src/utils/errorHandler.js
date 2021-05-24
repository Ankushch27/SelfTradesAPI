const AppError = require('./AppError');

const handleErrors = (e) => {
  console.error('handle err', e);

  if (e.code === 'ER_BAD_NULL_ERROR') {
    return new AppError('Please provide all input fields', 400);
  }

  if (e.code === 'ER_DUP_ENTRY') {
    if (e.sqlMessage.includes('email'))
      return new AppError('This email is already registered!', 422);
    else return new AppError('This mobile is already registered!', 422);
  }

  if (e.name === 'JsonWebTokenError') {
    return new AppError('Invalid token', 401);
  }

  if (e.name === 'ValidationError') {
    const { details } = e;
    const message = details.map((i) => i.message).join(',');

    console.log('error', message);
    return new AppError(message, 400);
  }
};

module.exports = { handleErrors };
