const express = require('express');

const auth = require('../middlewares/auth');
const { getAllUsers } = require('../services/userService');
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

module.exports = router;
