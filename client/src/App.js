import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, logOut } from "./services/userService";

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

  console.log(user);

  useEffect(() => {
    if (!user) return;
    blogService.getAll().then((blogs) => {
      console.log(blogs);
      return setBlogs(blogs);
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
      {blogs.map((blog) => {
        return <Blog key={blog.id} blog={blog} />;
      })}

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
