const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./config");

/** createToken(user) => { token }
 * Creates a token to be kept in local storage.
 */

function createToken(user) {
  console.assert(user.isadmin !== undefined,
      "createToken passed user without isAdmin property");

  let payload = {
    username: user.username,
    isAdmin: user.isadmin || false
  };

  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };