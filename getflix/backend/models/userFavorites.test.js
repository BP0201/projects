const db = require("../db");
const User = require("./user");
const UserFavorites = require("./userFavorites");

describe("Test User class", function () {
  beforeEach(async function () {
    await db.query("DELETE FROM user_favorites");
    await db.query("DELETE FROM users");
    let u = await User.register({
      username: "testUser",
      password: "password",
      isAdmin: false
    });

    let f = await UserFavorites.add({ username: "testUser", id: 1, id_type: "movie" });
    let f2 = await UserFavorites.add({ username: "testUser", id: 2, id_type: "tv" });
  });

  it("can view all favorites", async () => {
    let f = await UserFavorites.getAll("testUser");
    expect(f).toEqual([{ id: 1, id_type: "movie" },
                       { id: 2, id_type: "tv" }]);
  })

  it("can add to favorites", async () => {
    let f = await UserFavorites.add({ username: "testUser", id: 3, id_type: "movie" });
    expect(f).toEqual([{ fav_id: expect.any(Number), user_id: "testUser", id: 3, id_type: "movie" }]);
  });

  it("can remove from favorites", async () => {
    let f = await UserFavorites.remove({ username: "testUser", id: 1, id_type: "movie" });

    let f2 = await UserFavorites.getAll("testUser");
    expect(f2).toEqual([{ id: 2, id_type: "tv" }]);
  });
});

afterAll(async function() {
  await db.end();
});