const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../db/models/User");
const Blogs = require("../db/models/blog");

const badRequest = (cause) => ({ status: 400, message: { error: cause } });
const conflict = (cause) => ({ status: 409, message: { error: cause } });

exports.createUser = async (req, res, next) => {
  const { name, userName, password } = req.body;
  try {
    if (!userName || !name || !password) {
      throw badRequest("missing parameters");
    }
    if (userName.trim().length < 3 || password.trim().length < 3) {
      throw badRequest("Username or password too short");
    }

    if (await User.findOne({ userName }))
      throw conflict("userName already exist");
    const hashPassword = await genHashPass(password);
    const newUser = new User({ name, userName, hashPassword });
    const result = await newUser.save();
    res.status(201).send(result);
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (request, response) => {
  try {
    const users = await User.find({}).populate("blogs", {
      title: 1,
      url: 1,
      likes: 1,
    });
    response.json(users);
  } catch (err) {
    console.log(err);
  }
};

const genHashPass = async (password) => {
  return await bcrypt.hash(password, 10);
};
const compreHashPASS = async (hashPass, password) =>
  await bcrypt.compare(hashPass, password);
