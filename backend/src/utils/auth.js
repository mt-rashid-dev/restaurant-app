const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NOTE_ENV !== "development"
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