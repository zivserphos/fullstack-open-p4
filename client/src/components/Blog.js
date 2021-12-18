import axios from "axios";
import React, { useState } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const notyf = new Notyf();

const Blog = ({ blog, setBlogs, blogs, addLike2 }) => {
  const [visibleBlog, setVisibleBlog] = useState(false);
  const [buttonText, setButtonText] = useState("read more");
  const [likes, setLikes] = useState(blog.likes);

  let token = "";
  try {
    token = JSON.parse(localStorage.getItem("User")).token;
  } catch (err) {
    token = "";
  }
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const deleteBlog = async () => {
    config.data = { id: blog._id };
    try {
      const response = await axios.delete(
        "http://localhost:3003/api/blogs",
        config
      );
      const updatedBlogs = [...blogs];
      const index = updatedBlogs.findIndex(
        (someBlog) => someBlog._id === blog._id
      );
      updatedBlogs.splice(index, 1);
      setBlogs(updatedBlogs);
      notyf.success("blog has been deleted");
    } catch (err) {
      notyf.error(err.response.data.error);
    }
  };

  const addLike = async () => {
    await axios.put(
      "http://localhost:3003/api/blogs/likes",
      { id: blog._id },
      config
    );
    setLikes(likes + 1);
  };
  let removeBlog = <></>;
  if (localStorage.getItem("User")) {
    const isUserBlog =
      blog.user === JSON.parse(localStorage.getItem("User")).id ? true : false;
    if (isUserBlog)
      removeBlog = (
        <div key="remove">
          <button onClick={deleteBlog}>remove</button>
        </div>
      );
  }

  const changeButtonText = () =>
    setButtonText(buttonText === "read more" ? "show less" : "read more");
  const display = { display: visibleBlog ? "block" : "none" };
  const ChangeBlogDisplay = () => setVisibleBlog(visibleBlog ? false : true);

  return (
    <li>
      <div key="author" className="basic-details">
        <b>author:</b> {blog.author}
      </div>
      <div key="title" style={{ display: "inline" }}>
        <b> title:</b> {blog.title}
      </div>
      <button
        id="display-btn"
        key={"displayButton"}
        onClick={() => {
          changeButtonText();
          ChangeBlogDisplay();
        }}
      >
        {buttonText}
      </button>
      <div style={display} key="extra info" className="extra-info">
        <div key="likes">
          <b>likes</b>: {likes}
          <button
            key="likeButton"
            onClick={() => {
              addLike();
            }}
            className={"addLike"}
          >
            like
          </button>
        </div>
        <div key="url">
          <b>url:</b> {blog.url}
        </div>
        {removeBlog}
      </div>
    </li>
  );
};

export default Blog;
