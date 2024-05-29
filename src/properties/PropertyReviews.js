import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import AirbnbApi from "../AirbnbApi";

/** Show page with list of property reviews.
 *
 * *  */

function PropertyReviews() {
    const { propertyId } = useParams()
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        async function getPropReviews() {
            setReviews(await AirbnbApi.getPropertyReviews(propertyId))
        }
        getPropReviews(propertyId);
    }, [propertyId])

    if (!reviews) return <LoadingSpinner />;

    return (
        <div className="">
            {reviews.length > 0 ?
                (
                    <div className="PropertyList col-md-8 offset-md-2">
                        {reviews.map(review => (
                            <div>
                                <img src={review.reviewer.userProfilePicture.baseUrl}
                                    alt={review.reviewer.firstName} />
                                <h6>{review.reviewer.firstName}</h6>
                                <h6>{review.rating} Stars</h6>
                                <p>{review.comments}</p>
                            </div>
                            // <PropertyCard
                            // listing={prop.listing}
                            // key={prop.listing.id}
                            // />
                        ))}
                    </div>) : (
                    <p className="lead">doesn't</p>
                )}
        </div>
    )

}

export default PropertyReviews;
