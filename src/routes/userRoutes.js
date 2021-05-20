const express = require('express');

const auth = require('../middlewares/auth');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.get(
  '/user',
  auth,
  catchAsync(async (req, res) => {
    res.send(req.user);
  })
);

module.exports = router;
