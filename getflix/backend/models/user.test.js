const db = require("../db");
const { UnauthorizedError } = require("../expressError");
const User = require("./user");

describe("Test User class", function () {
  beforeEach(async function () {
    await db.query("DELETE FROM user_favorites");
    await db.query("DELETE FROM users");
    let u = await User.register({
      username: "testUser",
      password: "password",
      isAdmin: false
    });
    let a = await User.register({
      username: "admin",
      password: "password",
      isAdmin: true
    });
  });

  it("can register", async function () {
    let u = await User.register({
      username: "user11",
      password: "user11",
      isAdmin: false
    });

    expect(u.username).toBe("user11");
    expect(u.password).toBe(undefined);
  });

  it("can authenticate", async function () {
    let isValid = await User.authenticate("testUser", "password");
    expect(isValid).toBeTruthy();
  });

  it('should throw an error if auth fails', async () =>  {
    await expect(User.authenticate("testUser", "xxxxx"))
    .rejects
    .toThrow(UnauthorizedError);
});

  it("can retrieve a single user", async function () {
    let u = await User.getByUsername("testUser");
    expect(u).toEqual({ username: "testUser", is_admin: false })
  });

  it("can retrieve all users", async function () {
    let u = await User.getAll();
    expect(u).toEqual([{ username: "testUser", isadmin: false },
                       { username: "admin", isadmin: true }])
  });

  it("can delete a user", async function () {
    await User.remove("testUser");
    let u = await User.getAll();

    expect(u).toEqual([{ username: "admin", isadmin: true }])
  });

  it("can update user info", async function () {
    let u = await User.getByUsername("testUser");
    expect(u).toEqual({ username: "testUser", is_admin: false });

    let newU = await User.update("testUser",
              { password: "newPassword", username: "testUser2" });
    expect(newU).toEqual({ username: "testUser2", is_admin: false });

    let oldU = await User.getByUsername("testUser");
    expect(oldU).toBeFalsy();
  });
});

afterAll(async function() {
  await db.end();
});