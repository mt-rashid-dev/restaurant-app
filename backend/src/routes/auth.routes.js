const express = require("express");

const {
  signIn,
  signUp,
  signOut,
  checkAuth
} = require("../controllers/auth.controllers.js");
const { protectRoute } = require("../middleware/auth.middleware.js");

const authRoutes = express.Router();

// POST: /api/auth/sign-in
authRoutes.post("/sign-in", signIn);

// POST: /api/auth/sign-up
authRoutes.post("/sign-up", signUp);

// POST: /api/auth/sign-out
authRoutes.post("/sign-out", signOut);

// GET: /api/auth/check
authRoutes.get("/check", protectRoute, checkAuth);

module.exports = authRoutes;