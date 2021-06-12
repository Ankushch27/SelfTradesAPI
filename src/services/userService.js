const db = require('../db/mysql');

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT email, id, last_amount, mobile, module, name, timestamp FROM users', (error, results) => {
      if (error) return reject(error);
      return resolve(results);
    });
  });
};

module.exports = { getAllUsers };
