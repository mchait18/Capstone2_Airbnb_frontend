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

const FavoriteCard = ({ propertyId, propertyName, rating, imageUrl }) => {

    const [isFavorite, setIsFavorite] = useState(true);
    async function toggleFavorites(favoriteData) {
        await AirbnbApi.toggleFavorites(AirbnbApi.token, favoriteData)
        isFavorite ? setIsFavorite(false) : setIsFavorite(true)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        toggleFavorites({
            propertyId: propertyId
        })
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
                                // (
                                //     <div >
                                //         <span><i className="bi bi-heart h6"></i></span>
                                //     </div>
                                // )
                            }</div>
                    </CardImgOverlay>
                </Card>
                <Card.Body>
                    <Card.Title>{propertyName}
                    </Card.Title>
                    <Card.Text><i className="bi bi-star-fill" style={{ fontSize: "18px" }} ></i> {rating}</Card.Text>
                    {/* <Card.Text>{title}
                    </Card.Text> */}
                </Card.Body>
            </Card>
        </Link>
    )
}

export default FavoriteCard;

