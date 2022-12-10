import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** BackendAPI
 * Handles all API calls to the backend.
 * Related to the database, not the Movie Database API.
 */

class BackendAPI {
    // creates variable to store token in (passed in when token is created)
    static token;

    /** request(endpoint, data, method) => { data }
     * Setup method used in all other methods to actually make the request to the backend.
     */

    static async request(endpoint, data = {}, method = "get") {
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${BackendAPI.token}`}
        const params = (method === "get") ? data : {};
        try {
            const res = await axios({ url, method, data, params, headers });
            return res.data;
        } catch (e) {
            console.error("AXIOS ERROR:", e)
        }
    }

    /** login(data) => { token }
     * Authenticate a user and return their token if credentials match.
     */

    static async login(data) {
        const res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    /** signup(data) => { token }
     * Create user and return their token.
     */

    static async signup(data) {
        const res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    /** getCurrentUser(username) => { user }
     * Find a user using their username.
     */

    static async getCurrentUser(username) {
        const res = await this.request(`users/${username}`);
        if (!res) return;
        return res.user;
    }

    /** getAllUsers() => { users: [ { username, is_admin }, ... ], }
     * Admin method, returns all registered users.
     */

    static async getAllUsers() {
        const res = await this.request(`users`);
        return res.users;
    }

    /** updateUser(data) => { updatedUser }
     * Makes a patch request to /users/:username
     */

    static async updateUser(data) {
        const res = await this.request(`users/${data.username}`, data, "patch");
        return res.user;
    }

    /** deleteUser(username) => { message: "Deleted user" }
     * Delete a user, must be admin or same user.
     */

    static async deleteUser(username) {
        const res = await this.request(`users/${username}`, {}, "delete");
        return res.message;
    }

    // BEGIN UserFavorites METHODS

    /** addToFavorites(data) => { message: "Added to favorites" }
     * Add to user favorites.
     */

    static async addToFavorites(data) {
        const res = await this.request(`favorites/${data.username}`, data, "post");
        return res;
    }

    /** removeFromFavorites(data) => { message: "Removed from favorites" }
     * Remove from favorites.
     */

    static async removeFromFavorites(data) {
        const res = await this.request(`favorites/${data.username}`, data, "delete");
        return res;
    }

    /** getAllFavorites(username) => { favorites: [ { id, id_type }, ... ] }
     * Returns all favorited items for a given user.
     */

    static async getAllFavorites(username) {
        const res = await this.request(`favorites/${username}`);
        return res.favorites;
    }
}

export default BackendAPI;