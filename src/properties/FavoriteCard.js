import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import "bootstrap-icons/font/bootstrap-icons.css";
import AirbnbApi from "../AirbnbApi";
import CardImgOverlay from 'react-bootstrap/CardImgOverlay';

/** Show limited information about a booking
 *
 * Is rendered by BookingList to show a "card" for each booking.
 *
 * FavoriteList -> FavoriteCard
 */

const FavoriteCard = ({ propertyId, propertyName, rating, imageUrl, toggleFavorites }) => {

    const [isFavorite, setIsFavorite] = useState(true);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleFavorites({ propertyId })
        isFavorite ? setIsFavorite(false) : setIsFavorite(true)
    }
    return (
        <Link style={{ textDecoration: 'none' }}
            to={`/properties/${propertyId}`} >
            <Card border="white" style={{ width: '15rem' }} >
                <Card border="white">
                    <Card.Img border="white" variant="top" style={{ width: '10rem', height: '10rem' }} src={imageUrl} />
                    <CardImgOverlay>
                        <div onClick={handleSubmit}>
                            {isFavorite ? (
                                <div >
                                    <span><i className="bi bi-heart-fill text-danger" style={{ fontSize: "18px" }}></i></span>
                                </div>
                            ) : null
                            }</div>
                    </CardImgOverlay>
                </Card>
                <Card.Body>
                    <Card.Title>{propertyName}
                    </Card.Title>
                    <Card.Text><i className="bi bi-star-fill" style={{ fontSize: "18px" }} ></i> {rating}</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default FavoriteCard;

