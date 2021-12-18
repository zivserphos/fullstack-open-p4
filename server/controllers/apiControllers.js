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
  try {
    const blogs = await Blogs.find({});
    response.json(blogs);
  } catch (err) {
    response.json(err);
  }
};

exports.postBlog = async (request, response, next) => {
  console.log("im here");
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
    console.log(savedBlog);
    response.status(201).send(savedBlog);
  } catch (err) {
    next({ status: 400, message: { error: "Bad Request" } });
  }
};

exports.deleteBlog = async (request, response, next) => {
  const { id } = request.body;
  try {
    jwt.verify(request.token, SECRET);
    const result = await Blogs.findByIdAndDelete(id);
    response.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

exports.updateLikes = async (request, response) => {
  try {
    const { id } = request.body;
    const blog = await Blogs.findById(id);
    blog.likes += 1;
    await blog.save();
    response.status(200).send(blog);
  } catch (err) {
    next({ status: 400, message: { error: "BAD REQUEST" } });
  }
};
