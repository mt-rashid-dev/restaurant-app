const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const isProduction = process.env.NODE_ENV === "production"

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: 60,
  });

  res.cookie("jwt", token, {
    maxAge: 60 * 1000,
    httpOnly: true,
    sameSite: isProduction? "none" : "strict",
    secure: isProduction,
  });
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

const verifyPassword = async (password, storedPassword) => {
  return await bcrypt.compare(password, storedPassword);
}

module.exports = { generateToken, hashPassword, verifyPassword };