import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import Home from "../home/Home";
import PropertyReviews from "../properties/PropertyReviews"
import LoginForm from "../auth/LoginForm"
import PrivateRoute from "./PrivateRoute";
import SignupForm from "../auth/SignupForm"
import ProfileForm from "../ProfileForm"
import PropertyDetail from "../properties/PropertyDetail"
import PropertyListRoute from "../properties/PropertyListRoute"
import BookingDetail from "../bookings/BookingDetail";
import BookingList from "../bookings/BookingList"
import FavoritesList from "../properties/FavoritesList"
import NewPropertyForm from "../properties/NewPropertyForm";
import ListingsList from "../listings/ListingsList"
import ListingDetail from "../listings/ListingDetail"

function RouteList({ login, signup }) {
    return (
        <main>
            <Routes >
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<LoginForm login={login} />} />
                <Route exact path="/signup" element={<SignupForm signup={signup} />} />
                <Route exact path="/properties" element={<PropertyListRoute />} />
                <Route exact path="/properties/new" element={<NewPropertyForm />} />
                <Route exact path="/properties/listings/:token" element={<ListingsList />} />
                <Route exact path="/properties/favorites" element={<PrivateRoute><FavoritesList /></PrivateRoute>} />
                <Route exact path="/bookings" element={<PrivateRoute><BookingList /></PrivateRoute>} />
                <Route exact path="/properties/reviews/:propertyId" element={<PropertyReviews />} />
                <Route exact path="/properties/:propertyId" element={<PropertyDetail />} />
                <Route exact path="/properties/listing/:propertyId" element={<PrivateRoute><ListingDetail /></PrivateRoute>} />
                <Route exact path="/bookings/:bookingId" element={<PrivateRoute>< BookingDetail /></PrivateRoute>} />
                <Route exact path="/profile" element={<PrivateRoute><ProfileForm /></PrivateRoute>} />
                <Route element={<Navigate to="/" />} />
            </Routes >
        </main>
    )
}
export default RouteList