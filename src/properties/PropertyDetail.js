import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import ImageCarousel from "./ImageCarousel"
import AirbnbApi from "../AirbnbApi";
import BookingForm from '../bookings/BookingForm';
import Card from 'react-bootstrap/Card';
import UserContext from "../auth/UserContext";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        async function getProp() {
            setProperty(await AirbnbApi.getProperty(propertyId))
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

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Reviews
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <h4>Centered Modal</h4> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    if (!property) {
        return <p>Loading &hellip;</p>;
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col key="0" >
                        <Card border="white" style={{ width: '30rem', height: '30rem' }}>
                            <Card.Title><h2>{property.sections.title.title}</h2></Card.Title>
                            <Card.Img variant="top" src={property.imageUrl} />
                            <Card.Body>
                                <Card.Title>{property.title}</Card.Title>
                                <Card.Text>
                                    <Button variant="light" onClick={() =>
                                        // setModalShow(true)
                                        navigate(`/properties/reviews/${propertyId}`)
                                    }>
                                        {property.bookingData.reviewsCount} reviews
                                    </Button>
                                    <MyVerticallyCenteredModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    />
                                </Card.Text>
                            </Card.Body>
                            <Card.Img style={{ height: '5rem', width: '5rem' }} src={property.bookingData.hostProfilePhotoUrl} />
                            <Card.Text>Hosted by {property.bookingData.hostName}</Card.Text>
                        </Card>
                    </Col>
                    <Col key="1" >
                        <Card style={{ width: '40rem' }} border="white" >
                            <div className='mt-5 pt-4'>
                                <ImageCarousel
                                    photos={property.sections.photoTour.mediaItems}
                                    title="" />
                            </div>
                            <Card.Body>
                                <BookingForm
                                    propertyId={propertyId}
                                    checkIn={checkIn}
                                    checkOut={checkOut}
                                    createBooking={createBooking} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default PropertyDetail;
