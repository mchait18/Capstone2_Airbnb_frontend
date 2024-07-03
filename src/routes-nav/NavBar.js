import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./NavBar.css";
import AirbnbApi from "../AirbnbApi";
/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function NavBar({ logout }) {
    const { currentUser } = useContext(UserContext)
    console.log("current USER is ", currentUser)
    function loggedInNav() {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/properties/favorites">
                        My Favorites
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/bookings">
                        My Trips
                    </NavLink>
                </li>
                {currentUser.isOwner && <div>
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to={`/properties/listings/${AirbnbApi.token}`} >
                            My Listings
                        </NavLink>
                    </li></div>}
                {currentUser.isOwner && <div>
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/properties/new" >
                            Post a Listing
                        </NavLink>
                    </li></div>}
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/profile">
                        Profile
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <Link className="nav-link" to="/" onClick={logout}>
                        Log out {currentUser.first_name || currentUser.username}
                    </Link>
                </li>
            </ul>
        )
    }

    function loggedOutNav() {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/login">
                        Login
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/signup">
                        Sign Up
                    </NavLink>
                </li>
            </ul>
        );
    }
    return (
        <nav className="Navigation navbar navbar-expand-md">
            <Link className="navbar-brand m-2" to="/">
                Kosher Airbnb
            </Link>
            {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    );

}

export default NavBar;
