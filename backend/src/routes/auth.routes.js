const express = require("express");

const {
  signIn,
  signUp,
  signOut
} = require("../controllers/auth.controllers.js");

const authRoutes = express.Router();

// POST: /api/auth/sign-in
authRoutes.post("/sign-in", signIn);

// POST: /api/auth/sign-up
authRoutes.post("/sign-up", signUp);

// POST: /api/auth/sign-out
authRoutes.post("/sign-out", signOut);

module.exports = authRoutes;