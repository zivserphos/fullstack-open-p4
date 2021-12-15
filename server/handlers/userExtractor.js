const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const User = require("../db/models/User");
require("dotenv").config();
const SECRET = process.env.SECRET;
const jwtError = () => ({
  status: 401,
  message: { error: "token missing or invalid" },
});

async function userExtractor(request, response, next) {
  try {
    const { id } = jwt.verify(request.token, SECRET);
    const user = await User.findById(id);
    request.user = user.userName;
  } catch (err) {
    if (err instanceof JsonWebTokenError) next(jwtError);
  }
  next();
}
module.exports = userExtractor;
