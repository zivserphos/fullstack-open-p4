import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import { isLoggedIn } from "./services/userService";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = isLoggedIn();
    if (user) {
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      {user === null ? (
        <LoginForm />
      ) : (
        blogs.map((blog) => {
          <Blog key={blog.id} blog={blog} />;
        })
      )}
    </div>
  );
};

export default App;
