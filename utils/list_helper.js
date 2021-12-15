const collection = require("lodash/collection");

const dummy = (blogs) => {
  return 1;
};

dummy();

const totalLike = (blogs) => {
  let sum = 0;
  blogs.map((blog) => (sum += blog.likes));
  return sum;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 0;
  let topRatedIndex = 0;
  let topLikes = 0;
  blogs.map((blog, i) => {
    if (blog.likes > topLikes) {
      topLikes = blog.likes;
      topRatedIndex = i;
    }
  });
  return {
    likes: topLikes,
    title: blogs[topRatedIndex].title,
    author: blogs[topRatedIndex].author,
  };
};

const mostBlogs = (blogs) => {
  const authorArr = blogs.map((blog) => blog.author);
  const mostCommonAuthor = { blogs: 0, author: authorArr[0] };
  authorArr.map((currentAuthor) => {
    const numOfBlogs = authorArr.filter(
      (author) => author === currentAuthor
    ).length;
    if (numOfBlogs > mostCommonAuthor.blogs) {
      mostCommonAuthor.blogs = numOfBlogs;
      mostCommonAuthor.author = currentAuthor;
    }
  });
  return mostCommonAuthor;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  const mostLikesAuthor = { likes: 0, author: blogs[0].author };
  const authorsArr = [];
  blogs.map((blog) => {
    if (!authorsArr.includes(blog.author)) authorsArr.push(blog.author);
  });
  authorsArr.forEach((author) => {
    const currentAuthorLikes = authorLikes(
      blogs.filter((blog) => blog.author === author)
    );
    if (currentAuthorLikes > mostLikesAuthor.likes) {
      mostLikesAuthor.likes = currentAuthorLikes;
      mostLikesAuthor.author = author;
    }
  });
  return mostLikesAuthor;
};

const authorLikes = (blogs) => {
  let likes = 0;
  blogs.map((blog) => (likes += blog.likes));
  return likes;
};

module.exports = {
  totalLike,
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
