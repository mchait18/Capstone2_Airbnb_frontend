import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import AirbnbApi from "../AirbnbApi";
import dayjs from 'dayjs'

/** Show limited information about a booking
 *
 * Is rendered by BookingList to show a "card" for each booking.
 *
 * BookingList -> BookingCard
 */

const BookingCard = ({ bookingId }) => {
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        async function getBookingInfo() {
            const bookingRes = await AirbnbApi.getBooking(bookingId)
            setBooking(bookingRes)
        }
        getBookingInfo(bookingId);
    }, [bookingId])

    if (!booking) {
        return <p>Loading &hellip;</p>;
    }
    return (
        <Link style={{ textDecoration: 'none' }}
            to={`/bookings/${booking.id}`} >
            <Card border="white" style={{ width: '15rem' }} >
                <Card border="white">
                    <Card.Img border="white" variant="top" style={{ width: '10rem', height: '10rem' }} src={booking.imageUrl} />
                </Card>
                <Card.Body>
                    <Card.Title>{booking.location}
                    </Card.Title>
                    <Card.Text>Hosted by {booking.host}</Card.Text>
                    <Card.Text>{dayjs(booking.checkIn).format('MMM D ')}-{dayjs(booking.checkOut).format(' MMM D YYYY')}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default BookingCard;

