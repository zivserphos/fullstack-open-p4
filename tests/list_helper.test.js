const dummy = require("../utils/list_helper").dummy;
const totalLikes = require("../utils/list_helper").totalLike;
const favoriteBlog = require("../utils/list_helper").favoriteBlog;
const mostBlogs = require("../utils/list_helper").mostBlogs;
const mostLikes = require("../utils/list_helper").mostLikes;

// describe("dummy", () => {
//   test("dummy return 1", () => {
//     const blogs = [];

//     const result = dummy(blogs);
//     expect(result).toBe(1);
//   });
// });

// describe("total likes", () => {
//   const blogs = [
//     {
//       _id: "61b73a714de0b542a6b22d4b",
//       title: "nadav haNashNash",
//       url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
//       likes: 121,
//       __v: 0,
//     },
//   ];
//   test("of a bigger list is calulated right", () => {
//     const result = totalLikes(blogs);
//     expect(result).toEqual(121);
//   });
//   test("of empty list is zero", () => {
//     const result = totalLikes([]);
//     expect(result).toBe(0);
//   });
// });

// describe("favorite blog", () => {
//   test("of empty list is zero", () => {
//     const result = favoriteBlog([]);
//     expect(result).toBe(0);
//   });
//   test("of a bigger list is return the blog with highest amount of likes", () => {
//     const blogs = [
//       {
//         _id: "61b73a714de0b542a6b22d4b",
//         title: "nadav haNashNash",
//         url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
//         likes: 121,
//         __v: 0,
//       },
//       {
//         _id: "61b73a824de0b542a6b22d4d",
//         title: "nadav haNashNash",
//         url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
//         likes: 121,
//         __v: 0,
//       },
//       {
//         _id: "61b73e3acd1ef090c8f65492",
//         title: "nadav HAPAPATIR",
//         url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
//         likes: 121,
//         __v: 0,
//       },
//       {
//         _id: "61b749ff01fcedd9b505e4f6",
//         title: "my way to be kyle from webdev simplified",
//         url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
//         likes: 441,
//         __v: 0,
//       },
//       {
//         _id: "61b74c7ff194ced5d89ef77f",
//         title: "kill bill3",
//         url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
//         likes: 2,
//         __v: 0,
//       },
//       {
//         _id: "61b7550476ed0ac2832e2074",
//         title: "kill bill3",
//         url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
//         likes: 2,
//         __v: 0,
//       },
//       {
//         _id: "61b7551676ed0ac2832e2077",
//         title: "kill bill3",
//         author: "omer naveh",
//         url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
//         likes: 470,
//         __v: 0,
//       },
//     ];
//     const result = favoriteBlog(blogs);
//     expect(result).toEqual({
//       likes: 470,
//       author: "omer naveh",
//       title: "kill bill3",
//     });
//   });
// });

describe("most blogs", () => {
  test.only("returns the most common author", () => {
    const blogs = [
      {
        _id: "61b762e465a22964f8d270c2",
        title: "kill bill3",
        author: "ziv 123",
        url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
        likes: 470,
        __v: 0,
      },
      {
        _id: "61b762eb65a22964f8d270c4",
        title: "kill bas",
        author: "ziv 123",
        url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
        likes: 121,
        __v: 0,
      },
      {
        _id: "61b762fc65a22964f8d270c6",
        title: "kill bas",
        author: "roie glass",
        url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
        likes: 1243,
        __v: 0,
      },
      {
        _id: "61b7630565a22964f8d270c8",
        title: "kill bas",
        author: "ziv 123",
        url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
        likes: 1243,
        __v: 0,
      },
      {
        _id: "61b76cb5fe510214bd8554b3",
        title: "kill bas",
        author: "ziv 123",
        url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
        likes: 113,
        __v: 0,
      },
      {
        _id: "61b76cc0fe510214bd8554b5",
        title: "kill bas",
        author: "roie glass",
        url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
        likes: 113,
        __v: 0,
      },
      {
        _id: "61b76cc3fe510214bd8554b7",
        title: "kill bas",
        author: "roie glass",
        url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
        likes: 113,
        __v: 0,
      },
      {
        _id: "61b76cc5fe510214bd8554b9",
        title: "kill bas",
        author: "roie glass",
        url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
        likes: 113,
        __v: 0,
      },
      {
        _id: "61b76cc6fe510214bd8554bb",
        title: "kill bas",
        author: "roie glass",
        url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
        likes: 113,
        __v: 0,
      },
      {
        _id: "61b76d801350e6d4fdaf82ab",
        title: "kill bas",
        author: "roie glass",
        url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
        likes: 113,
        __v: 0,
      },
    ];
    const result = mostLikes(blogs);
    expect(result).toEqual({ author: "ziv 123", blogs: 3 });
  });
});
