const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

const verifyPassword = async (password, storedPassword) => {
  return await bcrypt.compare(password, storedPassword);
}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

module.exports = { encryptPassword, verifyPassword, generateToken };
