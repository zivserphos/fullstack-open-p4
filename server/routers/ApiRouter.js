const router = require("express").Router();
const {
  getAllBlogs,
  postBlog,
  deleteBlog,
  updateLikes,
} = require("../controllers/apiControllers");

router.get("/", getAllBlogs);
router.get("/hello", (req, res) => {
  res.json([
    { content: "HTML is easy", xxo: "HTML is easy" },
    { content: "HTML is easy", xxo: "HTML is easy" },
  ]);
});
router.put("/likes", updateLikes);
router.post("/", postBlog);
router.delete("/", deleteBlog);

module.exports = router;
