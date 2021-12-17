const router = require("express").Router();
const Blogs = require("../db/models/blog");
const User = require("../db/models/User");

router.post("/reset", async (request, response) => {
  await Blogs.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = router;
