const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");
const db = require("../db");
const User = require("../models/user");
const { SECRET_KEY } = require("../config");
// const UserFavorites = require("../models/userFavorites");
let testAdminToken = jwt.sign({ username: "test1", isAdmin: true }, SECRET_KEY);
let testUserToken = jwt.sign({ username: "test2", isAdmin: false }, SECRET_KEY);

describe("Users Routes Test", () => {

  beforeEach(async function () {


    await db.query("DELETE FROM user_favorites");
    await db.query("DELETE FROM users");

    let u1 = await User.register({
      username: "test1",
      password: "password",
      isAdmin: true
    });

    let u2 = await User.register({
      username: "test2",
      password: "password",
      isAdmin: false
    });

    // let f = await UserFavorites.add({ username: "test1", id: 1, id_type: "movie" });
    // let f2 = await UserFavorites.add({ username: "test1", id: 2, id_type: "tv" });
  });

  /** GET /users */

  describe("GET /users", () => {

    it("allows admins to retrieve all users", async () => {
      let res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${testAdminToken}`);
      expect(res.body).toEqual({ users: [{ username: "test1", isadmin: true }, { username: "test2", isadmin: false }]});
    });

    it("does not give user list to non-admins", async () => {
      let res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${testUserToken}`);
      expect(res.statusCode).toBe(401)
      expect(res.body).toEqual({ error: {message: "Unauthorized", status: 401 } });
    });
  });

  /** POST /users */

  describe("POST /users", () => {

    it("allows admins to create new users/admins", async () => {
      let res = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${testAdminToken}`)
      .send({
        user: {
          username: "test3",
          password: "password",
          isAdmin: true
        }
      });
      console.log("RES:", res.body)
      expect(res.statusCode).toBe(201);
      expect(res.body.user).toEqual({ username: 'test3', isadmin: true });
    });

    it("does not allow users to create users/admins", async () => {
      let res = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${testUserToken}`)
      .send({
        user: {
          username: "test3",
          password: "password",
          isAdmin: true
        }
      });
      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBeTruthy();
    });
  });

  /** GET /users/:username */

  describe("GET /users/:username", () => {

    it("returns the correct user", async () => {
      let res = await request(app).get("/users/test1");
      expect(res.body.user).toBeTruthy();
      expect(res.body.user.username).toBe("test1");
    })
  });

  /** DELETE /users/:username */

  describe("DELETE /users/:username", () => {

    it("allows admins to delete user", async () => {
      let res = await request(app).delete("/users/test2")
      .set("Authorization", `Bearer ${testAdminToken}`);
      expect(res.body.message).toBe("Deleted user")
    });

    it("allows user to delete own profile", async () => {
      let res = await request(app).delete("/users/test2")
      .set("Authorization", `Bearer ${testUserToken}`);
      expect(res.body.message).toBe("Deleted user");
    });

    it("doesn't allow users to delete other users", async () => {
      let res = await request(app).delete("/users/test1")
      // test1 = admin, test2 = user attempting to delete
      .set("Authorization", `Bearer ${testUserToken}`);
      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBeTruthy();
    });
  });

  /** PATCH /users/:username */

  describe("PATCH /users/:username", () => {

    it("allows admins to edit users", async () => {
      let res = await request(app).patch("/users/test2")
      .set("Authorization", `Bearer ${testAdminToken}`)
      .send({ username: "newUsername", password: "newPassword" });
      expect(res.body.user).toEqual({ username: "newUsername", is_admin: false });
    });

    it("allows same user to edit profile", async () => {
      let res = await request(app).patch("/users/test2")
      .set("Authorization", `Bearer ${testUserToken}`)
      .send({ username: "newUsername", password: "newPassword" });
      expect(res.body.user).toEqual({ username: "newUsername", is_admin: false });
    });

    it("does not allow users to edit other users", async () => {
      let res = await request(app).patch("/users/test1")
      .set("Authorization", `Bearer ${testUserToken}`)
      .send({ username: "newUsername", password: "newPassword" });
      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBeTruthy();
    })
  })
});

afterAll(async function () {
  await db.end();
});