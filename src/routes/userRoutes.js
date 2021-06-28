const express = require('express');

const auth = require('../middlewares/auth');
const { findUserByMobile } = require('../services/authService');
const { getAllUsers, updateUser } = require('../services/userService');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.get(
  '/user',
  auth,
  catchAsync(async (req, res) => {
    res.send(req.user);
  })
);

router.get(
  '/allUsers',
  catchAsync(async (req, res) => {
    const result = await getAllUsers();
    res.status(200).json({ result, error: null });
  })
);

router.patch(
  '/updateUser',
  catchAsync(async (req, res) => {
    const { amount, expiry, mobile, module } = req.body;

    const user = await findUserByMobile(mobile);
    if (!user) throw new AppError('User not found!', 422);
    
    const result = await updateUser(amount, expiry, mobile, module)
    res.status(200).json({ result, error: null });
  })
);

module.exports = router;
