const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");
const db = require("../db");
const User = require("../models/user");


describe("Auth Routes Test", function () {

  beforeEach(async function () {
    await db.query("DELETE FROM user_favorites");
    await db.query("DELETE FROM users");

    let u1 = await User.register({
      username: "test1",
      password: "password",
      isAdmin: false
    });
  });

  /** POST /auth/register => token */

  describe("POST /auth/register", () => {
    it("can register", async () => {
      let res = await request(app)
      .post("/auth/register")
      .send({
        username: "testUser1",
        password: "password"
      });
      let token = res.body.token;
      expect(jwt.decode(token)).toEqual({ username: "testUser1",
      isAdmin: false, iat: expect.any(Number) })
    });
  });

  /** POST /auth/token => token */

  describe("POST /auth/token", () => {
    it("can login", async () => {
      let res = await request(app)
      .post("/auth/token")
      .send({
        username: "test1",
        password: "password"
      });
      let token = res.body.token
      expect(jwt.decode(token)).toEqual({ username: "test1",
      isAdmin: false, iat: expect.any(Number) })
    });

    it("won't login with wrong password", async () => {
      let res = await request(app)
      .post("/auth/token")
      .send({ username: "test1", password: "badpassword" });
      expect(res.statusCode).toEqual(401)
    });
  });
});

afterAll(async function () {
  await db.end();
});
