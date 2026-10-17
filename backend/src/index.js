const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { connectDatabase, checkDatabaseConnection } = require("./config/db.js");
const foodRoutes = require("./routes/food.routes.js");
const authRoutes = require("./routes/auth.routes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/foods", foodRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, async () => {
  console.log(`Backend app is listening on port: ${port}`);
  const connectionStatus = await connectDatabase();
  checkDatabaseConnection(connectionStatus);
});