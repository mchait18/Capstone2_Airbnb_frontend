import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import FavoriteCard from "./FavoriteCard"
import LoadingSpinner from "../common/LoadingSpinner";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AirbnbApi from "../AirbnbApi";
import Alert from "../common/Alert";

/** Show page with list of favorites.
 *
 *
 * This is routed to at /favorites
 *
 * Routes -> { FavoritesCard }
 */

function FavoritesList() {
    const [favorites, setFavorites] = useState(null);
    const [formErrors, setFormErrors] = useState([]);

    useEffect(() => {
        async function getFavoritesOnMount() {
            try {
                setFavorites(await AirbnbApi.getFavorites(AirbnbApi.token))
            } catch (errors) {
                console.log("errors are ", errors)
                setFormErrors(errors)
                return
            }
            setFormErrors([]);
        }
        getFavoritesOnMount()
    }, [])
    // console.log("in BookingList, bookings is ", bookings)

    if (!favorites) return <LoadingSpinner />;

    return (
        <div>
            {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                :
                <Container fluid>
                    {favorites.length ?
                        <Row xs={2} md={3} lg={4} xl={6} xxl={7} className="g-4" style={{ padding: '2rem', paddingTop: '2rem' }}>
                            {
                                favorites.map(favorite => (
                                    <Col key={favorite.propertyId}>
                                        <FavoriteCard
                                            propertyId={favorite.propertyId}
                                            propertyName={favorite.propertyName}
                                            rating={favorite.rating}
                                            imageUrl={favorite.imageUrl}
                                        />
                                    </Col>
                                ))
                            }
                        </Row>
                        :
                        <Row className="g-4" style={{ padding: '2rem', paddingTop: '2rem' }}>
                            <p>No favorites yet.</p></Row>}
                </Container>}
        </div>
    )

}

export default FavoritesList;
