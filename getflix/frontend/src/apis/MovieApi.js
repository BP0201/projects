import axios from 'axios';

const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = "ac42b9530be599dfa7a69c0451944c0f"

/** MovieAPI
 * Handles all API calls related to The Movie Database API.
 */

class MovieAPI {

    /** fetch(query, category = "multi") {
     * Used to fetch data of any category from the API
     * Valid categories are "person", "movie", "tv" and "multi"
     * Returns an array of objects containing data for all media that matches the query.
     * } */

    static async fetch(query, category = "multi") {
        const url = `${BASE_URL}/search/${category}?api_key=${API_KEY}&query=${query}`;
        const res = await axios.get(url);
        return res.data.results;
    }

    /** fetchSingle(id, category) {
     * Search by id, category must be passed in, returns one result.
     * Used to pull data from API for individual media pages.
     * } */

    static async fetchSingle(id, category) {
        const url = `${BASE_URL}/${category}/${id}?api_key=${API_KEY}`;
        const res = await axios.get(url);
        return res.data;
    }

    /** fetchImagesForPage(id, category) {
     * Fetch images for a single movie or show to display on media page.
     * } */

    static async fetchImagesForPage(id, category) {
        const url = `${BASE_URL}/${category}/${id}/images?api_key=${API_KEY}`;
        return (await axios.get(url)).data;
    }

    /** getTrending() => { data }
     * Used on Homepage to retrieve trending shows and movies for the week.
     * Returns an array of objects.
     */

    static async getTrending() {
        const url = `${BASE_URL}/trending/all/week?api_key=${API_KEY}`;
        const res = await axios.get(url);
        return res.data.results;
    }
}


export default MovieAPI;
