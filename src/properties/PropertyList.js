import React from "react";
import Container from 'react-bootstrap/Container';
import PropertyCard from "./PropertyCard"
import LoadingSpinner from "../common/LoadingSpinner";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


/** Show page with list of properties.
 *
 *
 * This is routed to at /properties
 *
 * Routes -> { PropertyCard }
 */

function PropertyList({ properties, checkIn, checkOut }) {
    console.log("in ProperyList, properties is ", properties)

    if (!properties) return <LoadingSpinner />;

    return (
        <div>
            <Container fluid>
                <Row xs={2} md={3} lg={4} xl={4} xxl={6} className="g-4" style={{ padding: '2rem', paddingTop: '2rem' }}>
                    {properties.map(prop => (
                        <Col key={prop.listing.id}>
                            <PropertyCard property={prop} checkIn={checkIn} checkOut={checkOut} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )

}

export default PropertyList;
