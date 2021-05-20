const express = require('express');

const { createUser, findUserByEmail } = require('../services/authService');
const { encryptPassword, verifyPassword, generateToken } = require('../utils/authUtils');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const userValidation = require('../middlewares/userValidation');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Home page');
});

router.post(
  '/signup',
  userValidation.signupValidation,
  catchAsync(async (req, res) => {
    const { email, mobile, module, name, password } = req.body;

    const hashedPassword = await encryptPassword(password);
    const signupInfo = { email, mobile, module, name, password: hashedPassword };
    const result = await createUser(signupInfo);
    res.status(201).json({ result, error: null });
  })
);

router.post(
  '/login',
  userValidation.loginValidation,
  catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) throw new AppError('User not found!', 422);

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) throw new AppError('Login failed! Invalid credentials', 422);

    delete user.password;
    const token = generateToken(user.id);
    res.json({ result: { user, token }, errors: null });
  })
);

module.exports = router;
