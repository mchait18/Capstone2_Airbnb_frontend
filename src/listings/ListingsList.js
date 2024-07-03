import React, { useState, useEffect } from "react";
import AirbnbApi from "../AirbnbApi";
import Container from 'react-bootstrap/Container';
import ListingCard from "../listings/ListingCard"
import LoadingSpinner from "../common/LoadingSpinner";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from "../common/Alert";

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

    async function deleteListing(propertyId) {
        await AirbnbApi.deleteListing(propertyId);
        setListings(await AirbnbApi.getListings(AirbnbApi.token))
    }

    if (!listings) return <LoadingSpinner />;

    return (
        <div>
            {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                :
                <Container fluid>
                    {listings.length ?
                        <Row xs={2} md={3} lg={4} xl={4} xxl={6} className="g-4" style={{ padding: '2rem', paddingTop: '2rem' }}>
                            {listings.map(listing => (
                                <Col key={listing.propertyId}>
                                    <ListingCard
                                        listing={listing}
                                        deleteListing={deleteListing} />
                                </Col>
                            ))}
                        </Row>
                        :
                        <Row className="g-4" style={{ padding: '2rem', paddingTop: '2rem' }}>
                            <p>No listings yet.</p></Row>}
                </Container>}
        </div>
    )

}

export default ListingsList;
