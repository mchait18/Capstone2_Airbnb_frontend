import React from "react";
import { Link } from "react-router-dom";
import "./PropertyCard.css"
import Card from 'react-bootstrap/Card';

/** Show limited information about a property
 *
 * Is rendered by PropertList to show a "card" for each property.
 *
 * PropertyList -> PropertyCard
 */

const PropertyCard = ({ property, checkIn, checkOut }) => {
    return (
        <Link style={{ textDecoration: 'none' }}
            to={`/properties/${property.listing.id}?checkIn=${checkIn}&checkOut=${checkOut}`} >
            <Card border="white" >
                <Card border="white" >
                    <Card.Img variant="top" style={{ height: '15rem', width: '15rem' }} src={property.listing.contextualPictures[0].picture} />
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
        </Link>
    )
}

export default PropertyCard;

