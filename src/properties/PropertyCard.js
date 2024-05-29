import React from "react";
import { Link } from "react-router-dom";
import "./PropertyCard.css"
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

/** Show limited information about a property
 *
 * Is rendered by PropertList to show a "card" for each property.
 *
 * PropertyList -> PropertyCard
 */

const PropertyCard = ({ property }) => {
    return (
        <Link style={{ textDecoration: 'none' }} to={`/properties/${property.listing.id}`} >
            <Card border="white" >
                <Card>
                    <Card.Img variant="top" fluid style={{ height: '10rem' }} src={property.listing.contextualPictures[0].picture} />
                </Card>
                <Card.Body>
                    <Card.Title>{property.listing.title}</Card.Title>
                    <Card.Text>
                        <b>{property.pricingQuote.structuredStayDisplayPrice
                            .primaryLine.price}</b> night
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default PropertyCard;

