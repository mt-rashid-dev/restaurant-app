const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDatabase, checkDatabaseConnection } = require("./config/db");
const foodRoutes = require("./routes/food.routes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/foods", foodRoutes);

app.listen(port, async () => {
  console.log(`Backend app is listening on port: ${port}`);
  const connectionStatus = await connectDatabase();
  checkDatabaseConnection(connectionStatus);
});