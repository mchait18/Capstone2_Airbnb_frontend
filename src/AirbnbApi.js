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
        const headers = { Authorization: `Bearer ${AirbnbApi.token}` };
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

// for now, put token ("testuser" / "password" on class)
AirbnbApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default AirbnbApi;
