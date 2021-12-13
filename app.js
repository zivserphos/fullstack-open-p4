const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const Blog = require("./db/models/blog");
const ApiRouter = require("./routers/ApiRouter");
require("./db/mongo");

app.use(cors());
app.use(express.json());

app.use("/api/blogs", ApiRouter);

module.exports = app;
