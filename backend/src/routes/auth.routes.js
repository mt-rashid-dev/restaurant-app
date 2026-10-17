const express = require("express");

const {
  signIn,
  signUp
} = require("../controllers/auth.controllers.js");

const authRoutes = express.Router();

// POST: /api/auth/sign-in
authRoutes.post("/sign-in", signIn);

// POST: /api/auth/sign-up
authRoutes.post("/sign-up", signUp);

module.exports = authRoutes;