import { useState, useRef } from "react";

export default function NewBlog() {
  const [newBlog, setNewBlog] = useState({});

  const authorEl = useRef();
  const titleEl = useRef();
  const urlEl = useRef();

  const handleChange = (property, value) => {
    const updatedBlog = { ...newBlog };
    updatedBlog[property] = value;
    setNewBlog(updatedBlog);
  };
  return (
    <div>
      <h2>create new blog</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await blogService.create({
            author: authorEl.current.value,
            title: titleEl.current.value,
            url: urlEl.current.value,
          });
          setBlogs([...blogs, response]);
        }}
      >
        <div>
          <b>title:</b>
          <input
            type="text"
            ref={titleEl}
            onChange={({ target }) => handleChange("title", target.value)}
          ></input>
        </div>
        <div>
          <b>author:</b>
          <input
            type="text"
            ref={authorEl}
            onChange={({ target }) => handleChange("author", target.value)}
          ></input>
        </div>
        <div>
          <b>url:</b>
          <input
            type="text"
            ref={urlEl}
            onChange={({ target }) => handleChange("url", target.value)}
          ></input>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}
