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

function PropertyList(properties) {
    console.log("properties.properties is ", properties.properties)

    if (!properties) return <LoadingSpinner />;

    return (
        <div>
            <Container fluid>
                <Row xs={2} md={4} lg={5} xl={7} xxl={8} className="g-4" style={{ padding: '2rem', paddingTop: '2rem' }}>
                    {properties.properties.map(prop => (
                        <Col key={prop.listing.id}>
                            <PropertyCard property={prop} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )

}

export default PropertyList;
