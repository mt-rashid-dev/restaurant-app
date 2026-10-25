const express = require("express");
const multer = require("multer");

const { protectRoute } = require("../middleware/auth.middleware.js");
const { editProfile } = require("../controllers/user.controllers.js");

const userRoutes = express.Router();

// const upload = multer({ dest: "./uploads/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniquePrefix + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// PUT: /api/user/edit-profile
userRoutes.put("/edit-profile", protectRoute, upload.single("selectedPicture"), editProfile);

module.exports = userRoutes;