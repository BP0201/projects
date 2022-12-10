const express = require("express");
const UserFavorites = require("../models/userFavorites");
const router = express.Router();

/** POST /favorites/:username { username, id, idType } => { favorite }
 * Adds a movie or show to a favorites list.
*/

router.post("/:username", async function(req, res, next) {
  try {
    await UserFavorites.add(req.body)
    return res.json({ message: "Added to favorites" })
  } catch (e) {
    return next(e);
  }
});

/** DELETE /favorites/:username { username, id, id_type } =>
 *                               { message: "Removed" }
 * Remove a movie or show from a favorites list. */

router.delete("/:username", async function(req, res, next) {
  try {
    await UserFavorites.remove(req.body);
    return res.json({ message: "Removed from favorites"})
  } catch (e) {
    return next(e);
  }
});

/** GET /favorites/:username { username } => { favorites: [ {...}, ... ] }
 * Sends back a list of all favorited shows and movies.
 */

router.get("/:username", async function(req, res, next) {
  try {
    const favorites = await UserFavorites.getAll(req.params.username);
    return res.json({ favorites })
  } catch (e) {
    return next(e);
  }
});

module.exports = router;