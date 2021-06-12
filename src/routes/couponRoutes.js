const express = require('express');

const {
  getCoupons,
  addCoupon,
  updateCoupon,
  findCouponById,
  deleteCouponById
} = require('../services/couponService');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.post(
  '/addCoupon',
  catchAsync(async (req, res) => {
    const { active, coupon, discount, module } = req.body;
    const couponInfo = { active, coupon, discount, module };
    const { insertId } = await addCoupon(couponInfo);
    const result = await findCouponById(insertId);
    res.status(201).json({ result, error: null });
  })
);

router.patch(
  '/updateCoupon',
  catchAsync(async (req, res) => {
    const { active, coupon, discount, module, id } = req.body;
    const couponInfo = { active, coupon, discount, module, id };
    await updateCoupon(couponInfo);
    const result = await findCouponById(id);
    res.status(200).json({ result, error: null });
  })
);

router.delete(
  '/deleteCoupon',
  catchAsync(async (req, res) => {
    const { id } = req.body;
    const result = await deleteCouponById(id);
    res.status(200).json({ result, error: null });
  })
);

router.get(
  '/allCoupons',
  catchAsync(async (req, res) => {
    const result = await getCoupons();
    res.status(200).json({ result, error: null });
  })
);

module.exports = router;
