const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./handlers/errorHandler");
const UserRouter = require("./routers/UserRouter");
const ApiRouter = require("./routers/ApiRouter");

app.use(cors());
app.use(express.json());

app.use("/api/users", UserRouter);
app.use("/api/blogs", ApiRouter);
app.use(errorHandler);

module.exports = app;
