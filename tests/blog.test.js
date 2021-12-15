const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const Blogs = require("../db/models/blog");
const User = require("../db/models/User");
const api = supertest(app);

const mockUser = {
  name: "idan leon",
  userName: "idan_leon",
  hashPassword: "$2b$10$O1kTuMnJJtWaCJd2DCUT4eEOdSONnr6AXbL.E917uOi.atm/JVqx6",
  blogs: [
    {
      _id: "61b8c3c4cbfee92864a731e3",
      title: "kill bas",
      url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
      likes: 113,
    },
    {
      _id: "61b8c3e75b4cb68596280687",
      title: "kill bas",
      url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
      likes: 113,
    },
  ],
  id: "61b8c1ca67621807807b325f",
};

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

const genHeaders = async () => {
  const users = await User.find({});
  const res = await api
    .post("/api/login")
    .send({ userName: users[0].userName, password: "1234" });
  const token = res.body.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return headers;
};

const mockNoLikeBlog = {
  title: "koola like",
  author: "ziv 123",
  url: "https://www.linkedin.com/in/nadav-vol-46ab67220/",
  userId: "5a422a851b54a676234d17f7",
};

beforeAll(async () => {
  await Blogs.deleteMany({});
  await Blogs.insertMany(mockBlogs);
  await User.deleteMany({});
  await User.insertMany(mockUser);
});

describe("viewing a specific note", () => {
  test("add valid blog to data base", async () => {
    const headers = await genHeaders();
    const response = await api
      .post("/api/blogs")
      .send(mockBlog)
      .set(headers)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const BlogsInTheEnd = await Blogs.find({});
    expect(response.body.author).toBe(mockBlog.author);
    expect(BlogsInTheEnd).toHaveLength(mockBlogs.length + 1);
  });

  test("add blog without likes property will make a default of 0", async () => {
    const headers = await genHeaders();
    const response = await api
      .post("/api/blogs")
      .send(mockNoLikeBlog)
      .set(headers)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    expect(response.body.likes).toBe(0);
  });

  test("invalid test", async () => {
    const headers = await genHeaders();
    const response = await api
      .post("/api/blogs")
      .send({ fake: "yes it is" })
      .set(headers)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(response.body.error).toBe("Bad Request");
  });

  describe("delete , functionllity", () => {
    test("should delete one blog from dataBase", async () => {
      const BlogsAtStart = await Blogs.find({});
      const headers = await genHeaders();
      const response = await api
        .delete("/api/blogs")
        .send({ _id: "5a422a851b54a676234d17f7" })
        .set(headers)
        .expect(200)
        .expect("Content-Type", /application\/json/);
      const BlogsInTheEnd = await Blogs.find({});
      expect(BlogsInTheEnd).toHaveLength(BlogsAtStart.length - 1);
    });
    test("should not delete blog from data base if not permitted", async () => {
      const BlogsAtStart = await Blogs.find({});
      const headers = await genHeaders();
      const response = await api
        .delete("/api/blogs")
        .send({ _id: "5a422a851b54a676234d17f7" })
        .expect(401)
        .expect("Content-Type", /application\/json/);
      const BlogsInTheEnd = await Blogs.find({});
      expect(BlogsInTheEnd).toHaveLength(BlogsAtStart.length);
      expect(response.body.error).toBe("token missing or invalid");
    });
  });

  test("should update correctly likes of a blog", async () => {
    const headers = await genHeaders();
    const response = await api
      .put("/api/blogs/likes")
      .set(headers)
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
