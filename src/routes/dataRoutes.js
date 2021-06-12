const express = require('express');
const fs = require('fs/promises');

const auth = require('../middlewares/auth');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

let dir = 'D:\\HTML-CSS\\Brad-web\\images\\logos';

router.get(
  '/singledata',
  auth,
  catchAsync(async (req, res) => {
    const data = (await fs.readFile(`${dir}\\1.jpeg`)).toString('base64');
    res.status(200).json({ result: { data }, errors: null });
  })
);
router.get(
  '/data',
  auth,
  catchAsync(async (req, res) => {
    let images = []
    const files = await fs.readdir(dir);
    for (const file of files) {
      const content = (await fs.readFile(`${dir}\\${file}`)).toString('base64')
      images.push(content)
    }
    res.status(200).json({ result: { images }, errors: null });
  })
);

module.exports = router;
