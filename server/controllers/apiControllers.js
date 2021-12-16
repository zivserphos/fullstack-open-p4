const mongoose = require("mongoose");
const Blogs = require("../db/models/blog");
const User = require("../db/models/User");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const SECRET = process.env.SECRET;

const jwtError = () => ({
  status: 401,
  message: { error: "token missing or invalid" },
});

exports.getAllBlogs = async (request, response) => {
  console.log("im here");
  try {
    const blogs = await Blogs.find({});
    response.json(blogs);
  } catch (err) {
    response.json(err);
  }
};

exports.postBlog = async (request, response, next) => {
  console.log(request.body);
  const blog = new Blogs(request.body);
  const token = request.token;
  if (!token) next(jwtError());
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    next(jwtError());
  }
  try {
    const user = await User.findById(decodedToken.id);

    blog.user = user._id;
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).send(savedBlog);
  } catch (err) {
    next({ status: 400, message: { error: "Bad Request" } });
  }
};

exports.deleteBlog = async (request, response, next) => {
  const { _id } = request.body;
  try {
    jwt.verify(request.token, SECRET);
    const result = await Blogs.findByIdAndDelete(_id);
    response.status(200).send({ g: "s" });
  } catch (err) {
    next(err);
  }
};

exports.updateLikes = async (request, response) => {
  try {
    const { _id, likes } = request.body;
    await Blogs.updateOne({ _id }, { $set: { likes } });
    const updatedBlog = await Blogs.findOne({ _id });
    response.status(200).send(updatedBlog);
  } catch (err) {
    next({ status: 400, message: { error: "BAD REQUEST" } });
  }
};
