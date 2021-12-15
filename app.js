const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./handlers/errorHandler");
const UserRouter = require("./routers/UserRouter");
const ApiRouter = require("./routers/ApiRouter");
const LoginRouter = require("./routers/LoginRouter");
const tokenExtractor = require("./handlers/authHandler");
const userExtractor = require("./handlers/userExtractor");

app.use(cors());
app.use(express.json());

app.use("/api/login", LoginRouter);
app.use("/api/users", UserRouter);
app.use("/api/blogs", tokenExtractor, userExtractor, ApiRouter);
app.use(errorHandler);

module.exports = app;
