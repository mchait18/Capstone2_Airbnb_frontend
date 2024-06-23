import React, { useState, useEffect, useContext } from "react";
import AirbnbApi from "../AirbnbApi";
import Container from 'react-bootstrap/Container';
import ListingCard from "../listings/ListingCard"
import LoadingSpinner from "../common/LoadingSpinner";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


/** Show page with list of user's listings.
 *
 *
 * This is routed to at /properties/listings/token
 *
 * Routes -> { ListingCard }
 */

function ListingsList() {
    const [listings, setListings] = useState(null);
    const [formErrors, setFormErrors] = useState([]);

    //console.log("in ListingsList, listings is ", listings)

    useEffect(() => {
        async function getListingsOnMount() {
            try {
                setListings(await AirbnbApi.getListings(AirbnbApi.token))
            } catch (errors) {
                console.log("errors are ", errors)
                setFormErrors(errors)
                return
            }
            setFormErrors([]);
        }
        getListingsOnMount()
    }, [])

    if (!listings) return <LoadingSpinner />;

    return (
        <div>
            <Container fluid>
                <Row xs={2} md={3} lg={4} xl={4} xxl={6} className="g-4" style={{ padding: '2rem', paddingTop: '2rem' }}>
                    {listings.map(listing => (
                        <Col key={listing.propertyId}>
                            <ListingCard listing={listing} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )

}

export default ListingsList;
