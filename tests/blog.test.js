const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const Blogs = require("../db/models/blog");
const api = supertest(app);

const mockBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const mockBlog = {
  title: "learning tests is shit",
  author: "Ziv B. Serphos",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  likes: 2,
};

const mockNoLikeBlog = {
  title: "tests is bed",
  author: "Ziv G. Serphos",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
};

beforeAll(async () => {
  await Blogs.deleteMany({});
  await Blogs.insertMany(mockBlogs);
});

describe("viewing a specific note", () => {
  test("add valid blog to data base", async () => {
    const response = await api
      .post("/api/blogs")
      .send(mockBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const BlogsInTheEnd = await Blogs.find({});
    expect(response.body.author).toBe(mockBlog.author);
    expect(BlogsInTheEnd).toHaveLength(mockBlogs.length + 1);
  });

  test("add blog without likes property will make a default of 0", async () => {
    const response = await api
      .post("/api/blogs")
      .send(mockNoLikeBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    expect(response.body.likes).toBe(0);
  });

  test("invalid test", async () => {
    const response = await api
      .post("/api/blogs")
      .send({ fake: "yes it is" })
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(response.body.error).toBe("Bad Request");
  });

  test("should delete one blog from dataBase", async () => {
    const response = await api
      .delete("/api/blogs")
      .send({ _id: "5a422a851b54a676234d17f7" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const BlogsInTheEnd = await Blogs.find({});
    console.log(BlogsInTheEnd);
    expect(BlogsInTheEnd).toHaveLength(mockBlogs.length + 1);
  });

  test("should update correctly likes of a blog", async () => {
    const response = await api
      .put("/api/blogs/likes")
      .send({ _id: "5a422bc61b54a676234d17fc", likes: "141" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body.likes).toBe(141);
  });
}, 10000);

afterAll(() => {
  mongoose.connection.close();
  app.close();
});
