const jwt = require("jsonwebtoken");

const User =  require("../models/user.model.js");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).send({
        message: "Unauthorized - No Token Provided",
        type: "auth-error",
        success: false
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne(
      { _id: decoded.userId },
      { password: 0 }
    );

    if (!user) {
      return res.status(400).send({
        message: "User not found",
        type: "auth-error",
        success: false
      });
    }

    req.user = user;
    next();

  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).send({
        message: "Unauthorized - Token Expired",
        type: "auth-error",
        success: false
      });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).send({
        message: "Unauthorized - Invalid Token",
        type: "auth-error",
        success: false
      });
    }

    console.log(`Error in protectRoute middleware: ${err}`);

    return res.status(500).send({
      message: "Internal server error",
      success: false
    });
  }
};

module.exports = { protectRoute }