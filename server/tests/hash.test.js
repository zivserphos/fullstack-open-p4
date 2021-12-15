const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const User = require("../db/models/User");
const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({
      userName: "root",
      name: "Ziv Serphos",
      hashPassword: "FSA34",
      blogs: [],
    });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      userName: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
      blogs: [],
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.userName);
    expect(usernames).toContain(newUser.userName);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      blogs: [],
      userName: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(409)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("userName already exist");

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
  app.close();
});
