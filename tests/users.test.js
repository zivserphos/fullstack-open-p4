const app = require("../index");
const supertest = require("supertest");
const mongoose = require("mongoose");
const bcreypt = require("bcrypt");
const User = require("../db/models/User");
const Blogs = require("../db/models/Blog");
const api = supertest(app);

const fakeUsers = [
  {
    _id: "61b8b9fd131122a7616cdbd0",
    name: "itamar cohen",
    userName: "avi_avraham",
    hashPassword:
      "$2b$10$AC/OtO1nT0G7aHTUdEW.ieBEqXJMqfxFWecFx/eECQkt4PJmdPrxa",
    blogs: [],
    __v: 0,
  },
  {
    _id: "61b8ba16131122a7616cdbd5",
    name: "ben zehavi",
    userName: "ben_zehavi",
    hashPassword:
      "$2b$10$FH/98ShtACpf7yXsoIWbsufKBIJSoA7o5um4.Z0pEeQ//XhiD/qCK",
    blogs: [],
    __v: 0,
  },
  {
    _id: "61b8ba25131122a7616cdbda",
    name: "idan leon",
    userName: "idan_leon",
    hashPassword:
      "$2b$10$SwOShhFyJrZfyJfrr5ZxmuxLgvtGGTjXe6/skRb4kM76l4EmRTL3.",
    blogs: [],
    __v: 0,
  },
];
const fakeUser = {
  name: "omer golan",
  userName: "omer_golan",
  password: "xyz1234",
};

const userTaken = {
  userName: "avi_avraham",
  name: "nadav",
  password: "DASdgs",
};

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(fakeUsers);
});

describe("viewing a specific user", () => {
  test("should add valid user to data base correctly", async () => {
    const response = await api
      .post("/api/users")
      .send(fakeUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    expect(response.body.userName).toEqual(fakeUser.userName);
    const usersAtEnd = await User.find({});
    expect(fakeUsers.length).toBe(usersAtEnd.length - 1);
  });
  describe("shoould not add invalid user to DataBase and add appropiete error message", () => {
    test("when userName has been taken", async () => {
      const usersAtStart = await User.find({});
      const response = await api
        .post("/api/users")
        .send(userTaken)
        .expect(409)
        .expect("Content-Type", /application\/json/);

      expect(response.body.error).toContain("userName already exist");

      const usersAtEnd = await User.find({});
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
  app.close();
});
