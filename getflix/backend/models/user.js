const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require('../config');
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");

/** User Model
 * Contains methods for signing up, logging in, editing or deleting an account, and usernames are used to store user favorites.
 */

class User {

    /** authenticate(username, password) => { user }
     * Used when logging in a user to determine if username and password match stored values.
    */

    static async authenticate(username, password) {
        const res = await db.query(
            `SELECT username, password, is_admin as isAdmin FROM users
            WHERE username = $1`, [username],
        );
        const user = res.rows[0];

        if (user) {
            const isValid = await bcrypt.compare(password, user.password);

            if (isValid === true) {
                delete user.password;
                return user;
            }
        }
        throw new UnauthorizedError("Username/password were invalid")
    }

    /** register({ username, password, isAdmin }) => { newUser }
     * Used with signup form to create new users, isAdmin is automatically passed in as false.
    */

    static async register({ username, password, isAdmin }) {
        const dupeCheck = await db.query(
            `SELECT username FROM users
            WHERE username = $1`,[username],
        );
        if (dupeCheck.rows[0]) {
            throw new BadRequestError("That username has been taken")
        }
        const hashedPw = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const res = await db.query(
            `INSERT INTO users (username, password, is_admin)
            VALUES ($1, $2, $3) RETURNING username, is_admin as isAdmin`,
            [username, hashedPw, isAdmin]
        );
        return res.rows[0]
    }

    /** getAll() => { users: [ { username, isAdmin }, ... ] }
     * Admin only method used to retrieve all registered users.
    */

    static async getAll() {
        const res = await db.query(
            `SELECT username, is_admin as isAdmin FROM users`
        );
        return res.rows;
    }

    /** getByUsername(username) => { user }
     * Used to retrieve a single user via username.
    */

    static async getByUsername(username) {
        const res = await db.query(
            `SELECT username, is_admin FROM users WHERE username = $1`,
            [username]
        );
        return res.rows[0]
    }

    /** remove(username) => No return value
     * Deletes a user.
     */

    static async remove(username) {
        await db.query(
            `DELETE FROM users WHERE username = $1`,
            [username]
        );
    }

    /** update(username, data) => { updatedUser }
     * Update user information.
     */

    static async update(username, data) {
        let arrIdx = 1;
        let sqlQuery = `UPDATE users SET password = $${arrIdx}`
        arrIdx++
        data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR)
        let sqlArr = [data.password];

        if (data.username) {
            sqlQuery += `, username = $${arrIdx}`
            arrIdx++
            sqlArr.push(data.username)
        }
        sqlQuery += ` WHERE username = $${arrIdx} RETURNING username, is_admin`
        arrIdx++
        sqlArr.push(username)

        const res = await db.query(sqlQuery, sqlArr);
        const user = res.rows[0]
        return user;
    }
}

module.exports = User;