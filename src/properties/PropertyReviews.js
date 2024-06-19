import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import AirbnbApi from "../AirbnbApi";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import "bootstrap-icons/font/bootstrap-icons.css";

/** Show page with list of property reviews.
 *
 * *  */

function PropertyReviews() {
    const { propertyId } = useParams()
    const [reviews, setReviews] = useState(null);
    console.log("reviews is ", reviews)

    useEffect(() => {
        async function getPropReviews() {
            setReviews(await AirbnbApi.getPropertyReviews(propertyId))
        }
        getPropReviews(propertyId);
    }, [propertyId])

    if (!reviews) return <LoadingSpinner />;

    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h3>{reviews.length} Reviews</h3>
            {reviews.length > 0 ?
                (
                    <Container className="card">
                        {reviews.map(review => (
                            <Row >
                                <Card style={{ width: "30rem" }} border='white'>
                                    <Image roundedCircle
                                        style={{ height: '3rem', width: '3rem' }}
                                        src={review.reviewer.userProfilePicture.baseUrl}
                                        alt={review.reviewer.firstName} />
                                    <Card.Title>{review.reviewer.firstName}</Card.Title>
                                    <Card.Text>{review.rating} <i className="bi bi-star-fill" style={{ fontSize: "20px" }} ></i>  {review.localizedDate}
                                    </Card.Text>
                                    <Card.Text>{review.comments}</Card.Text>
                                    <br></br>
                                </Card>
                            </Row>
                        ))}
                    </Container>
                ) : (
                    <p className="lead">No Reviews Yet</p>
                )}
        </div>
    )
}

export default PropertyReviews;
