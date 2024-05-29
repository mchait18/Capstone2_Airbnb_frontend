import React from "react";
import "./Home.css";
// import UserContext from "../auth/UserContext";
import SearchForm from "../common/SearchForm";
import { useNavigate } from "react-router-dom";


/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Home
 */

function Home() {
    const navigate = useNavigate();
    // const { currentUser } = useContext(UserContext);
    // console.debug("Homepage", "currentUser=", currentUser);

    /** Triggered by search form submit; reloads properties. */
    async function searchFor(formData) {
        navigate(`/properties?location=${formData.location}&checkin=${formData.checkin}&checkout=${formData.checkout}&adults=${formData.adults}`)
    }
    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Kosher Airbnb</h1>
                <p className="lead">Start your Vacation Now</p>
                <SearchForm searchFor={searchFor} />
            </div>
        </div>
    );
}

export default Home;