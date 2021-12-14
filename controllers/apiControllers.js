const mongoose = require("mongoose");
const Blogs = require("../db/models/blog");
const User = require("../db/models/User");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

exports.getAllBlogs = async (request, response) => {
  try {
    const blogs = await Blogs.find({});
    response.json(blogs);
  } catch (err) {
    response.json(err);
  }
};

exports.postBlog = async (request, response, next) => {
  const blog = new Blogs(request.body);
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const { userId } = request.body;
  try {
    const user = await User.findById(userId);
    blog.user = user._id;
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    console.log(user);
    const savedUser = await user.save();
    response.status(201).send(savedBlog);
  } catch (err) {
    console.log(err);
    next({ status: 400, message: { error: "Bad Request" } });
  }
};

exports.deleteBlog = async (request, response) => {
  const { _id } = request.body;
  try {
    const result = await Blogs.deleteOne({ _id: _id });
    response.status(200).send(result);
  } catch (err) {
    console.log(err);
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
