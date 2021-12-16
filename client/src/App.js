import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, logOut } from "./services/userService";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const { authorEl, titleEl, urlEl } = useRef();

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
    const blogs = blogService.getAll().then((blogs) => {
      return setBlogs(blogs);
    });
  }, [user]);

  if (user === null) {
    return (
      <div>
        <h2>blogs</h2>
        <LoginForm setUser={setUser} />
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
        <h2>create new blog</h2>
        <form>
          <div>
            <b>title:</b>
            <input type="text" ref={titleEl}></input>
          </div>
          <div>
            <b>author:</b>
            <input type="text" ref={authorEl}></input>
          </div>
          <div>
            <b>url:</b>
            <input type="text" ref={urlEl}></input>
            <button
              type="submit"
              onClick={(e) =>
                blogService.create(e, { titleEl, authorEl, urlEl })
              }
            >
              Create
            </button>
          </div>
        </form>
      </div>
      <div>
        <button
          onClick={() => {
            logOut();
            navigate("/");
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
