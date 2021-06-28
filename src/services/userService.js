const db = require('../db/mysql');

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT email, id, last_amount, mobile, module, name, created_at FROM users', (error, results) => {
      if (error) return reject(error);
      return resolve(results);
    });
  });
};

const updateUser = (amount, expiry, mobile, module) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE users SET expiry = ?, last_amount = ?, module = ? WHERE mobile = ?',
      [expiry, amount, module, mobile],
      (error, results) => {
        if (error) return reject(error);
        return resolve(results);
      }
    );
  });
};

module.exports = { getAllUsers, updateUser };
