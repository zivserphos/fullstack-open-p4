import axios from "axios";
import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [visibleBlog, setVisibleBlog] = useState(false);
  const [buttonText, setButtonText] = useState("read more");
  const [likes, setLikes] = useState(blog.likes);

  const deleteBlog = async (id) => {
    const res = await axios.delete(`${baseUrl}/${id}`, {
      headers: {
        authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imtha2EiLCJpZCI6IjYxYjhjZDE2YTMzOGNkNTJiZDkyNzUzMSIsImlhdCI6MTYzOTU4MTM1M30.dRd1FsS-hwqIqu05HTk_POtNgCKW-T1mxDusZs1OF90",
      },
      data: { id },
    });
    return res.data;
  };

  const token = JSON.parse(localStorage.getItem("User")).token;
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const deleteBlog = async () => {
    await axios.delete("http://localhost:3003/api/blogs", config, {
      data: { id: blog._id },
    });
  };

  const addLike = async () => {
    await axios.put(
      "http://localhost:3003/api/blogs/likes",
      { id: blog._id },
      config
    );
    setLikes(likes + 1);
  };

  const changeButtonText = () =>
    setButtonText(buttonText === "read more" ? "show less" : "read more");
  const display = { display: visibleBlog ? "block" : "none" };
  const ChangeBlogDisplay = () => setVisibleBlog(visibleBlog ? false : true);

  return (
    <div>
      <div>
        <b>author:</b> {blog.author}
      </div>
      <div>
        <b> title:</b> {blog.title}
      </div>
      <button
        onClick={() => {
          changeButtonText();
          ChangeBlogDisplay();
        }}
      >
        {buttonText}
      </button>
      <div style={display}>
        <div>
          <b>likes</b>: {likes}
          <button onClick={addLike}>like</button>
        </div>
        <div>
          <b>url:</b> {blog.url}
        </div>
        <div>
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
