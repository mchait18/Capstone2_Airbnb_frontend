import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import CardImgOverlay from 'react-bootstrap/CardImgOverlay';
import "bootstrap-icons/font/bootstrap-icons.css";



/** Show limited information about a property
 *
 * Is rendered by PropertList to show a "card" for each property.
 *
 * PropertyList -> PropertyCard
 */

const PropertyCard = ({ property, checkIn, checkOut, isFavorite, toggleFavorites }) => {
    // console.log("in PropertyCard property is ", property, "isFavorite is", isFavorite)

    async function handleSubmit(e) {
        e.preventDefault();
        await toggleFavorites({
            propertyId: property.listing.id,
            imageUrl: property.listing.contextualPictures[0].picture,
            propertyName: property.listing.name,
            rating: property.listing.avgRatingLocalized,
            title: property.listing.title
        })
    }
    return (
        <Link style={{ textDecoration: 'none' }}
            to={`/properties/${property.listing.id}?checkIn=${checkIn}&checkOut=${checkOut}`} >
            <Card border="white" >
                <Card border="white" >
                    <Card.Img variant="top" style={{ height: '15rem', width: '15rem' }} src={property.listing.contextualPictures[0].picture} />
                    <CardImgOverlay>
                        <div onClick={handleSubmit}>
                            {isFavorite ? (
                                <div >
                                    <span><i className="bi bi-heart-fill text-danger" style={{ fontSize: "23px" }}></i></span>
                                </div>
                            ) : (
                                <div >
                                    <span><i className="bi bi-heart-fill text-secondary-gray" style={{ fontSize: "23px" }}></i></span>
                                </div>
                            )}</div>
                    </CardImgOverlay>
                </Card>
                <Card.Body>
                    <Card.Title>{property.listing.city}</Card.Title>
                    <Card.Text>
                        {property.pricingQuote.structuredStayDisplayPrice
                            .primaryLine.accessibilityLabel
                        }
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link >
    )
}

export default PropertyCard;

