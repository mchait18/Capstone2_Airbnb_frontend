import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import "bootstrap-icons/font/bootstrap-icons.css";



/** Show limited information about a listing
 *
 * Is rendered by ListingsList to show a "card" for each listing.
 *
 * ListingsList -> ListingCard
 */

const ListingCard = ({ listing, deleteListing }) => {
    // console.log("in ListingCard listing is ", listing)
    async function handleSubmit(e) {
        e.preventDefault();
        await deleteListing(listing.propertyId)
    }

    return (
        <Link style={{ textDecoration: 'none' }}
            to={`/properties/listing/${listing.propertyId}`} >
            <Card border="white" >
                <Card border="white" >
                    <Card.Img variant="top" style={{ height: '15rem', width: '15rem' }} src={listing.imageUrl} />
                </Card>
                <Card.Body>
                    <Card.Title>{listing.city}</Card.Title>
                    <Card.Text>
                        ${listing.pricePerNight} per night
                        <div onClick={handleSubmit}>
                            <i class="bi bi-trash" style={{ fontSize: "23px" }}></i>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link >
    )
}

export default ListingCard;

