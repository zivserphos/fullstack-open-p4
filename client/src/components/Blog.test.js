import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/react";
import Blog from "./Blog";
import BlogForm from "./NewBlog";

describe("blog display", () => {
  let component;
  let component2;
  const mockHandler = jest.fn();

  beforeEach(() => {
    const blog = {
      title: "first react test",
      author: "netanya",
      url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
      userId: "61b8c3c4cbfee92864a731e3",
    };
    component = render(<Blog blog={blog} addLike2={mockHandler} />);
    component2 = render(<BlogForm blog={blog} addBlogTest={mockHandler} />);
  });

  test("should render basic details for each blog", () => {
    const basicDetailsDiv = component.container.querySelector(".basic-details");
    const extraDetailsDiv = component.container.querySelector(".extra-info");
    expect(component.container).toHaveTextContent("first react test");
    expect(basicDetailsDiv).not.toHaveStyle("display: none");
    expect(extraDetailsDiv).toHaveStyle("display:none");
  });

  test("should show extra info when button read more is pressed", () => {
    const button = component.getByText("read more");
    fireEvent.click(button);
    const extraDetailsDiv = component.container.querySelector(".extra-info");
    expect(extraDetailsDiv).not.toHaveStyle("display:none");
  });

  test("should identify correctly amount of clicks on like button", () => {
    const button = component.getByText("read more");
    fireEvent.click(button);
    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });

  test("should add blog when addBlog ", async () => {
    const addBlogBtn = component2.container.querySelector(".addBlogBtn");
    fireEvent.click(addBlogBtn);
    fireEvent.click(addBlogBtn);
    expect(mockHandler.mock.calls).toHaveLength(2);
    expect(mockHandler.mock.calls[0][0].title).toBe("first react test");
    expect(mockHandler.mock.calls[0][0].author).toBe("netanya");
    expect(mockHandler.mock.calls[0][0].url).toBe(
      "https://www.linkedin.com/in/nadav-vol-46ab67220/"
    );
  });
});
