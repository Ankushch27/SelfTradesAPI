const db = require('../db/mysql');
const { handleErrors } = require('../utils/authUtils');

const signup = (req, res) => {
  const { name, email, password } = req.body;
  const signupInfo = { name, email, password };
  db.query('INSERT INTO users SET ?', signupInfo, (error, results) => {
    if (error) {
      const errorMsg = handleErrors(error.code);
      return res.status(400).json({ errorMsg });
    }
    res.status(201).json(results);
  });
};

module.exports = { signup };
