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
            <div className="container ">
                <h1 className="mb-4 font-weight-bold text-center">Kosher Airbnb</h1>
                <p className="lead text-center">Start your Vacation Now</p>
                <SearchForm searchFor={searchFor} />
                <p className="lead text-center"><i>* indicates required field</i></p>
            </div>
        </div>
    );
}

export default Home;