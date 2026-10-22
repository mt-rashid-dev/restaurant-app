const jwt = require("jsonwebtoken");

const User =  require("../models/user.model.js");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).send({
        message: "Unauthorized - No Token Provided",
        success: false
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).send({
        message: "Unauthorized - Invalid Token",
        success: false
      });
    }

    const user = await User.findOne({ _id: decoded.userId}, { password: 0 });

    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(`Error in protectRoute middleware: ${error}`);
    res.status(500).send({
      message: "Internal server error",
      success: false
    })
  }
};

module.exports = { protectRoute }