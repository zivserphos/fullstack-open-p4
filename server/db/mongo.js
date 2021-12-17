const mongoose = require("mongoose");
const app = require("../app");
require("dotenv").config();
const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGO_URI;

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("../routers/TestingRouter");
  app.use("/api/testing", testingRouter);
}

exports.mongo = mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongo successfully");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
