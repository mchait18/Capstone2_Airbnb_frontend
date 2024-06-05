import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import ImageCarousel from "./ImageCarousel"
import AirbnbApi from "../AirbnbApi";
import BookingForm from '../bookings/BookingForm';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import UserContext from "../auth/UserContext";
import Container from 'react-bootstrap/Container';

function PropertyDetail() {
    const [formErrors, setFormErrors] = useState([]);
    const navigate = useNavigate();
    const { propertyId } = useParams()
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const checkIn = query.get("checkIn")
    const checkOut = query.get("checkOut")
    const [property, setProperty] = useState(null);
    const { currentUser } = useContext(UserContext);

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
                userId: currentUser.id,
                propertyId: propertyId,
                imageUrl: property.imageUrl,
                location: property.location,
                host: property.bookingData.hostName,
                ...formData
            });
            navigate(`/bookings/${booking.id}`)

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
            <Container fluid>
                <Card style={{ width: '18rem' }}>
                    <Card.Title>{property.sections.title.title}</Card.Title>
                    <Card.Img variant="top" src={property.imageUrl} />
                    <Card.Body>
                        <Card.Title>{property.title}</Card.Title>
                        <Card.Text>
                            <Link to={`/properties/reviews/${propertyId}`} >
                                {property.bookingData.reviewsCount} reviews
                            </Link>
                        </Card.Text>
                    </Card.Body>
                    <Card.Img style={{ height: '5rem', width: '5rem' }} src={property.bookingData.hostProfilePhotoUrl} />
                    <ListGroup.Item>Hosted by {property.bookingData.hostName}</ListGroup.Item>
                    <ListGroup.Item><BookingForm
                        propertyId={propertyId}
                        checkIn={checkIn}
                        checkOut={checkOut}
                        createBooking={createBooking} /></ListGroup.Item>
                    <Card.Body>

                    </Card.Body>
                </Card>
            </Container>
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
