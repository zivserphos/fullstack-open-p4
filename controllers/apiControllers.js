const Blog = require("../db/models/blog");

exports.getAllBlogs = (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
};

exports.postBlog = (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
};
