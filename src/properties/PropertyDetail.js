import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import ImageCarousel from "./ImageCarousel"
import AirbnbApi from "../AirbnbApi";
import BookingForm from '../bookings/BookingForm';
import { v4 as uuid } from 'uuid';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function PropertyDetail() {
    const { propertyId } = useParams()
    const [property, setProperty] = useState(null);
    const [formErrors, setFormErrors] = useState([]);

    useEffect(() => {
        async function getProp() {
            setProperty(await AirbnbApi.getProperty(propertyId))
            // setReviews(await AirbnbApi.getPropertyReviews(propertyId))
        }
        getProp(propertyId);
    }, [propertyId])

    console.log("property is ", property)
    async function createBooking(formData) {
        try {
            const booking = await AirbnbApi.createBooking({
                bookingId: uuid(),
                propertyId, ...formData
            });
        } catch (errors) {
            console.log("errors are ", errors)
            setFormErrors(errors)
            return
        }
        setFormErrors([]);
    }

    if (!property) {
        return <p>Loading &hellip;</p>;
    }

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={property.imageUrl} />
                <Card.Body>
                    <Card.Title>{property.title}</Card.Title>
                    <Card.Text>
                        <Link to={`/properties/reviews/${propertyId}`} >
                            <h6>{property.bookingData.reviewsCount} reviews</h6>
                        </Link>
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <Card.Img style={{ height: '5rem', width: '5rem' }} src={property.bookingData.hostProfilePhotoUrl} />
                    <ListGroup.Item>Hosted by {property.bookingData.hostName}</ListGroup.Item>
                    <ListGroup.Item><BookingForm createBooking={createBooking} propertyId={propertyId} /></ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
                <Card.Body>

                </Card.Body>
            </Card>
            {/* <img src={property.imageUrl}
                alt={property.title}
            // className="float-right ml-5"
            />
            <ImageCarousel
                photos={property.sections.photoTour.mediaItems}
                title="" />
            <h4>{property.title}</h4>
            <Link to={`/properties/reviews/${propertyId}`} >
                <h6>{property.bookingData.reviewsCount} reviews</h6>
            </Link>
            <img src={property.bookingData.hostProfilePhotoUrl}
                alt={property.bookingData.hostName} />
            <h5>Hosted by {property.bookingData.hostName}</h5>
            <BookingForm createBooking={createBooking} propertyId={propertyId} /> */}
        </div>
    );
}

export default PropertyDetail;
