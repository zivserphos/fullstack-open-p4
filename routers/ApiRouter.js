const router = require("express").Router();
const { getAllBlogs, postBlog } = require("../controllers/apiControllers");

router.get("/", getAllBlogs);
router.post("/", postBlog);

module.exports = router;
