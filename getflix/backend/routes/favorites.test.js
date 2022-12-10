const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");
const db = require("../db");
const User = require("../models/user");
const UserFavorites = require("../models/userFavorites");

describe("Favorites Routes Test", () => {

  beforeEach(async function () {
    await db.query("DELETE FROM user_favorites");
    await db.query("DELETE FROM users");

    let u1 = await User.register({
      username: "test1",
      password: "password",
      isAdmin: false
    });

    let u2 = await User.register({
      username: "test2",
      password: "password",
      isAdmin: false
    });

    let f = await UserFavorites.add({ username: "test1", id: 1, id_type: "movie" });
    let f2 = await UserFavorites.add({ username: "test1", id: 2, id_type: "tv" });
  });

  /** POST /favorites/:username */

  describe("POST /favorites/:username", () => {
    it("can add to favorites", async () => {
      let u = await UserFavorites.getAll("test2");
      expect(u).toEqual([]);

      let f = await UserFavorites.add({ username: "test2", id: 3, id_type: "movie" });
      let newU = await UserFavorites.getAll("test2");
      expect(newU).toEqual([{ id: 3, id_type: "movie" }]);
    });
  });

  /** GET /favorites/:username */

  describe("GET /favorites/:username", () => {
    it("can get all favorites", async () => {
      let u = await UserFavorites.getAll("test1");
      expect(u).toEqual([{id: 1, id_type: "movie" }, { id: 2, id_type: "tv" }]);
    });
  });

  // /** DELETE /favorites/:username */

  describe("DELETE /favorites/:username", () => {
    it("can remove from favorites", async () => {
      let u = await UserFavorites.getAll("test1");
      expect(u).toEqual([{id: 1, id_type: "movie" }, { id: 2, id_type: "tv" }]);

      let f = await UserFavorites.remove({ username: "test1", id: 1, id_type: "movie" });
      let u2 = await UserFavorites.getAll("test1");
      expect(u2).toEqual([{ id: 2, id_type: "tv" }]);

    });
  });
});

afterAll(async function () {
  await db.end();
});