const jwt = require('jsonwebtoken');
const { findUserById } = require('../services/authService');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const auth = catchAsync(async (req, res, next) => {
  const authHeader = req.header('Authorization')
  if(!authHeader) throw new AppError('Authentication required', 401);

  const token = authHeader.replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await findUserById(decoded.id);

  if (!user) throw new AppError('User does not exist!', 404);

  req.token = token;
  req.user = user;
  next();
});

module.exports = auth;
