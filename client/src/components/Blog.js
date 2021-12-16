import React from "react";

const Blog = ({ blog }) => {
  console.log("Ggg");
  return (
    <div>
      <b>author:</b> {blog.author}
      <b> title:</b> {blog.title}
      <b> likes:</b> {blog.likes}
    </div>
  );
};

export default Blog;
