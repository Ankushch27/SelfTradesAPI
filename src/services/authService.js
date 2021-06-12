const db = require('../db/mysql');

const createUser = (data) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO users SET ?', data, (error, results) => {
      if (error) return reject(error);
      return resolve(results);
    });
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
      if (error) return reject(error);
      return resolve(results[0]);
    });
  });
};

const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT email, id, mobile, module, name, timestamp FROM users WHERE id = ?',
      [id],
      (error, results) => {
        if (error) return reject(error);
        return resolve(results[0]);
      }
    );
  });
};

const findUserByMobile = (mobile) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM users WHERE mobile = ?',
      [mobile],
      (error, results) => {
        if (error) return reject(error);
        return resolve(results[0]);
      }
    );
  });
};

const updatePassword = (mobile, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE users SET password = ? WHERE mobile = ?',
      [password, mobile],
      (error, results) => {
        if (error) return reject(error);
        return resolve(results);
      }
    );
  });
};

module.exports = { createUser, findUserByEmail, findUserById, findUserByMobile, updatePassword };
