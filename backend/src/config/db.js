const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    return mongoose.connection.readyState; // return connection status
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
  }
};

const checkDatabaseConnection = (connectionStatus) => {
  if (connectionStatus === 0) {
    console.log("MongoDB connection status: disconnected");
  } else if (connectionStatus === 1) {
    console.log("MongoDB connection status: connected");
  } else if (connectionStatus === 2) {
    console.log("MongoDB connection status: connecting");
  } else if (connectionStatus === 3) {
    console.log("MongoDB connection status: disconnecting");
  }
}

module.exports = { connectDatabase, checkDatabaseConnection };