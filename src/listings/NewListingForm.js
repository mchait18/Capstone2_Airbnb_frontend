import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Alert from "../common/Alert";
import AirbnbApi from "../AirbnbApi"
import UserContext from "../auth/UserContext";
import { v4 as uuid } from 'uuid';

function NewListingForm() {
    const { currentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        propertyName: "",
        title: "",
        imageUrl: "",
        reviewsCount: "",
        hostName: "",
        hostPhoto: "",
        adults: "",
        pricePerNight: "",
        rating: "",
        city: "",
        propertyType: ""
    });
    const [formErrors, setFormErrors] = useState([]);
    const [formCompleted, setFormCompleted] = useState(false);
    const navigate = useNavigate();

    // console.debug(
    //     "SignupForm",
    //     "signup=", typeof signup,
    //     "formData=", formData,
    //     "formErrors=", formErrors,
    // );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
        setFormErrors([]);
    }

    /** on form submit:
     * - attempt save to backend & report any errors
     * - if successful
     *   - clear previous error messages and password
     *   - show save-confirmed message
     *   - set current user info throughout the site
     */

    async function handleSubmit(e) {
        e.preventDefault();
        let listingData = {
            propertyId: uuid(),
            propertyName: formData.propertyName,
            title: formData.title,
            imageUrl: formData.imageUrl,
            reviewsCount: formData.reviewsCount,
            hostId: currentUser.id,
            hostName: formData.hostName,
            hostPhoto: formData.hostPhoto,
            adults: formData.adults,
            pricePerNight: formData.pricePerNight,
            rating: formData.rating,
            city: formData.city,
            propertyType: formData.propertyType
        };

        try {
            await AirbnbApi.addListing(listingData);
            navigate(`/properties/listings/${AirbnbApi.token}`)
            // console.log("newly created property is ", property)
        } catch (errors) {
            //debugger;
            setFormErrors(errors);
            return;
        }
        setFormErrors([]);
        setFormCompleted(true);
    }
    //if form is submitted, redirect to home page. Otherwise, load form
    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h3 className="mb-3, mt-3">New Listing</h3>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>* Property Name</label>
                            <input
                                name="propertyName"
                                className="form-control"
                                value={formData.propertyName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>* Property Title</label>
                            <input
                                name="title"
                                className="form-control"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>* Photo</label>
                            <input
                                name="imageUrl"
                                className="form-control"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Reviews Count</label>
                            <input
                                name="reviewsCount"
                                className="form-control"
                                value={formData.reviewsCount}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>* Host Name</label>
                            <input
                                name="hostName"
                                className="form-control"
                                value={formData.hostName}
                                onChange={handleChange}
                                required
                            />
                        </div><div className="form-group">
                            <label>* Host Photo</label>
                            <input
                                name="hostPhoto"
                                className="form-control"
                                value={formData.hostPhoto}
                                onChange={handleChange}
                                required
                            />
                        </div><div className="form-group">
                            <label>* Maximum Number of Guests</label>
                            <input
                                name="adults"
                                className="form-control"
                                value={formData.adults}
                                onChange={handleChange}
                                required
                            />
                        </div><div className="form-group">
                            <label>* Price Per Night</label>
                            <input
                                name="pricePerNight"
                                className="form-control"
                                value={formData.pricePerNight}
                                onChange={handleChange}
                                required
                            />
                        </div><div className="form-group">
                            <label>Rating</label>
                            <input
                                name="rating"
                                className="form-control"
                                value={formData.rating}
                                onChange={handleChange}
                            />
                        </div><div className="form-group">
                            <label>* Location</label>
                            <input
                                name="city"
                                className="form-control"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div><div className="form-group">
                            <label>* Property Type</label>
                            <input
                                name="propertyType"
                                className="form-control"
                                value={formData.propertyType}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {formErrors.length
                            ? <Alert type="danger" messages={formErrors} />
                            : null
                        }
                        {formCompleted ?
                            <Alert type="success" messages={["Updated successfully."]} />
                            : null}
                        <button
                            type="submit"
                            className="btn btn-secondary btn-block mt-4"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <p className="lead text-center"><i>* indicates required field</i></p>
        </div>
    )
}


export default NewListingForm;