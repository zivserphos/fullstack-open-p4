import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, logOut } from "./services/userService";
import NewBlog from "./components/NewBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loginUser = isLoggedIn();
    if (loginUser) {
      navigate("/blogs");
      blogService.setToken(loginUser.token);
      setUser(loginUser);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      return setBlogs(sortedBlogs);
    });
  }, [user]);

  if (user === null) {
    return (
      <div>
        <h2>blogs</h2>
        <LoginForm setUser={setUser} setBlogs={setBlogs} />
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <ul style={{ listStyleType: "none" }}>
        {blogs.map((blog) => {
          return (
            <Blog
              key={blog._id}
              blog={blog}
              setBlogs={setBlogs}
              blogs={blogs}
            />
          );
        })}
      </ul>
      <NewBlog setBlogs={setBlogs} blogs={blogs} />
      <div>
        <button
          onClick={() => {
            logOut();
            setUser(null);
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default App;
