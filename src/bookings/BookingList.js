import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import BookingCard from "./BookingCard"
import LoadingSpinner from "../common/LoadingSpinner";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AirbnbApi from "../AirbnbApi";
import Alert from "../common/Alert";

/** Show page with list of bookings.
 *
 *
 * This is routed to at /bookings
 *
 * Routes -> { BookingCard }
 */

function BookingList() {
    const [bookings, setBookings] = useState(null);
    const [formErrors, setFormErrors] = useState([]);

    useEffect(() => {
        async function getBookingsOnMount() {
            try {
                setBookings(await AirbnbApi.getBookings())
            } catch (errors) {
                console.log("errors are ", errors)
                setFormErrors(errors)
                return
            }
            setFormErrors([]);
        }
        getBookingsOnMount()
    }, [])
    // console.log("in BookingList, bookings is ", bookings)

    if (!bookings) return <LoadingSpinner />;

    return (
        <div>
            {formErrors.length
                ? <Alert type="danger" messages={["Please fill out all required fields"]} />
                :
                <Container fluid>
                    {bookings.length ?
                        <Row xs={2} md={3} lg={4} xl={6} xxl={7} className="g-4" style={{ padding: '2rem', paddingTop: '2rem' }}>
                            {bookings.map(booking => (
                                <Col key={booking.id}>
                                    <BookingCard bookingId={booking.id} />
                                </Col>
                            ))}
                        </Row>
                        :
                        <Row className="g-4" style={{ padding: '2rem', paddingTop: '2rem' }}>
                            <p>No trips yet.</p></Row>}
                </Container>}
        </div>
    )

}

export default BookingList;
