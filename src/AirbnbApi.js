import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class AirbnbApi {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${localStorage.getItem("airbnb-token")}` };
        // console.log("headers is ", headers)
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }


    // Individual API routes

    /** Get details on a property by id. */

    static async getProperty(propertyId) {
        let res = await this.request(`properties/${propertyId}`);
        return res.property.data;
    }
    static async getPropertyReviews(propertyId) {
        let res = await this.request(`properties/reviews/${propertyId}`);
        return res.reviews.data;
    }

    /**adds new listing */
    static async addListing(listingData) {
        let res = await this.request('properties', listingData, "post");
        return res.property;
    }
    //gets user listings
    static async getListings(token) {
        let res = await this.request(`properties/listings/${token}`)
        return res.listings;
    }
    //get one listing
    static async getListing(propertyId) {
        let res = await this.request(`properties/listing/${propertyId}`);
        return res.listing;
    }

    //delete a listing
    static async deleteListing(propertyId) {
        let res = await this.request(`properties/listing/${propertyId}`, {}, "delete");
        return res.listing;
    }
    /** Get list of all properties. */
    static async getProperties(searchData) {
        let res = await this.request("properties", searchData);
        return res.properties;
    }

    static async createBooking(bookingData) {
        let res = await this.request('bookings', bookingData, "post");
        return res.booking;
    }
    static async checkPrice(bookingData) {
        let res = await this.request('bookings/checkPrice', bookingData);
        return res.price;
    }
    //bookings functions
    static async getBookings() {
        let res = await this.request('bookings')
        return res.bookings;
    }

    static async getBooking(bookingId) {
        let res = await this.request(`bookings/${bookingId}`);
        return res.booking;
    }
    /* returns current user */
    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }
    static async signup(signupData) {
        let res = await this.request("auth/register", signupData, "post");
        return res.token;
    }
    static async login(loginData) {
        let res = await this.request("auth/token", loginData, "post");
        // console.log("in login, res.token is ", res.token)
        return res.token;
    }
    // favorites functions

    //gets users favorites
    static async getFavorites(token) {
        let res = await this.request(`properties/favorites/${token}`)
        return res.favorites;
    }
    static async getFavorite(favoriteId) {
        let res = await this.request(`properties/favorite/${favoriteId}`)
        return res.favorite;
    }
    //add/remove favorite
    static async toggleFavorites(token, favoriteData) {
        let res = await this.request(`properties/favorites/${token}`, favoriteData, "post");
        // return res.booking;
    }
    static async saveProfile(username, profileData) {
        let status = await this.checkPassword(username, profileData.password)
        if (status.msg === "Success") {
            let res = await this.request(`users/${username}`, profileData, "patch");
            return res.user;
        }
    }
    static async checkPassword(username, password) {
        let res = await this.request(`auth/checkPassword`, { username, password }, "post")
        return res
    }
}


export default AirbnbApi;
