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

function RouteList({ login, signup }) {
    return (
        <main>
            <Routes >
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<LoginForm login={login} />} />
                <Route exact path="/signup" element={<SignupForm signup={signup} />} />
                <Route exact path="/properties" element={<PropertyListRoute />} />
                <Route exact path="/bookings" element={<BookingList />} />
                <Route exact path="/properties/reviews/:propertyId" element={<PropertyReviews />} />

                {/* <PrivateRoute exact path="/jobs">
                    <JobList /> */}
                {/* </PrivateRoute> */}
                {/* <Route exact path="/properties/:propertyId" element={<PrivateRoute />} > */}
                <Route exact path="/properties/:propertyId" element={<PropertyDetail />} />
                <Route exact path="/bookings/:bookingId" element={< BookingDetail />} />
                {/* </Route> */}
                <Route exact path="/profile" element={<PrivateRoute />} >
                    <Route exact path="/profile" element={<ProfileForm />} />
                </Route>
                <Route element={<Navigate to="/" />} />
            </Routes >
        </main>
    )
}
export default RouteList