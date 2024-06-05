import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import AirbnbApi from "../AirbnbApi";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import dayjs from 'dayjs'

function BookingDetail() {
    dayjs().format()
    const { bookingId } = useParams()
    const [booking, setBooking] = useState(null);
    const [property, setProperty] = useState(null);

    useEffect(() => {
        async function getBookingInfo() {
            const bookingRes = await AirbnbApi.getBooking(bookingId)
            setBooking(bookingRes)
            const propertyRes = await AirbnbApi.getProperty(bookingRes.propertyId)
            setProperty(propertyRes)
        }
        getBookingInfo(bookingId);
    }, [bookingId])

    // console.log("in bookingDetail, booking is ", booking)
    // console.log("in bookingDetail, property is ", property)

    if (!booking || !property) {
        return <p>Loading &hellip;</p>;
    }

    return (
        <div>
            <Container fluid >
                <Row  >
                    <Col key="0" >
                        <Card border="white">
                            <Card.Title>Your Trip</Card.Title>
                            <Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>
                                        <Card.Title>Dates
                                        </Card.Title>
                                        <Card.Text>{dayjs(booking.checkIn).format('MMM D')}-{dayjs(booking.checkOut).format('MMM D')}
                                        </Card.Text>
                                        <Card.Title>House Rules
                                        </Card.Title>
                                        <Card.Text>{property.sections.policies.houseRules[0].title}
                                        </Card.Text>
                                        <Card.Text>{property.sections.policies.houseRules[1].title}
                                        </Card.Text>
                                        <Card.Text>{property.sections.policies.houseRules[2].title}
                                        </Card.Text>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col key="1">
                        <Card >
                            <Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>
                                        <Card.Img src={property.imageUrl} style={{ width: '10rem', height: '10rem' }} />
                                        <Card.Text>{property.title}</Card.Text>
                                        <Card.Text>{property.roomType}</Card.Text>
                                        {property.bookingData.isSuperHost && (
                                            //pic of trophy and star
                                            <Card.Text>Superhost</Card.Text>
                                        )}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Card.Title>Price Details</Card.Title>
                                        <Card.Text>{booking.priceTitle}</Card.Text>
                                        <Card.Text>Cleaning Fee: {booking.cleaningFee}</Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Card.Text><b>Total (USD) {booking.totalPrice}</b></Card.Text>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default BookingDetail;
