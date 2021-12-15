const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../db/models/User");

exports.login = async (request, response) => {
  const { userName, password } = request.body;
  const user = await User.findOne({ userName });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.hashPassword);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
};

const SECRET = process.env.SECRET;
console.log(SECRET);
