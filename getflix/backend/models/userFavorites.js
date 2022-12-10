const db = require("../db");

/** UserFavorites Model
 * Contains methods for adding and removing favorites, as well as retrieving all favorites for a given user.
 */

class UserFavorites {

  /** add({ username, id, id_type }) => { user_id, id, id_type }
   * Adds a movie/show id to the database under the user's name.
   */

  static async add({ username, id, id_type }) {
      const res = await db.query(
        `INSERT INTO user_favorites (user_id, id, id_type) VALUES
        ($1, $2, $3) RETURNING *`,
        [username, id, id_type]);
      return res.rows;
  }

  /** remove({ username, id, id_type }) => No return value
   * Removes an item from user favorites list.
   */

  static async remove({ username, id, id_type }) {
    await db.query(
      `DELETE FROM user_favorites WHERE user_id = $1 AND id = $2 AND id_type = $3`,
      [username, id, id_type]);
  }

  /** getAll(username) => { favorites: [ { id, id_type }, ... ] }
   *
   */

  static async getAll(username) {
    const res = await db.query(
      `SELECT id, id_type FROM user_favorites
        WHERE user_id = $1`, [username]);
    return res.rows;
  }
}

module.exports = UserFavorites;