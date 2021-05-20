const catchAsync = require('../utils/catchAsync');
const { signup, login } = require('../validation/userSchema');

const signupValidation = catchAsync(async (req, res, next) => {
  await signup.validateAsync(req.body);
  next();
});

const loginValidation = catchAsync(async (req, res, next) => {
  await login.validateAsync(req.body);
  next();
});

module.exports = { signupValidation, loginValidation };
