const db = require('../db/mysql');

const addCoupon = (data) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO coupons SET ?', data, (error, results) => {
      if (error) return reject(error);
      return resolve(results);
    });
  });
};

const updateCoupon = ({ active, coupon, discount, module, id }) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE coupons SET ? WHERE id = ?',
      [{ active, coupon, discount, module }, id],
      (error, results) => {
        if (error) return reject(error);
        return resolve(results);
      }
    );
  });
};

const findCouponById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM coupons WHERE id = ?', [id], (error, results) => {
      if (error) return reject(error);
      return resolve(results[0]);
    });
  });
};

const deleteCouponById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM coupons WHERE id = ?', [id], (error, results) => {
      if (error) return reject(error);
      return resolve(results);
    });
  });
};

const getCoupons = () => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT active, coupon, discount, id, module FROM coupons',
      (error, results) => {
        if (error) return reject(error);
        return resolve(results);
      }
    );
  });
};

module.exports = { addCoupon, updateCoupon, findCouponById, deleteCouponById, getCoupons };
