import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import AirbnbApi from "../AirbnbApi";
import PropertyList from "./PropertyList";
import Alert from "../common/Alert";
import UserContext from "../auth/UserContext";

function ProperyListRoute() {
    const { currentUser } = useContext(UserContext);
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const location = query.get("location")
    const checkin = query.get("checkin")
    const checkout = query.get("checkout")
    const adults = query.get("adults")
    const [properties, setProperties] = useState(null);
    const [formErrors, setFormErrors] = useState([]);
    const [favorites, setFavorites] = useState(null);
    const [newStr, setNewStr] = useState("")
    const navigate = useNavigate();
    // console.log("in ProperyListRoute, currentUser is ", currentUser)

    useEffect(() => {
        async function getPropertiesOnMount() {
            try {
                setProperties(await AirbnbApi.getProperties({
                    location, checkin, checkout, adults
                }))
                setFavorites(await AirbnbApi.getFavorites(AirbnbApi.token))
            } catch (errors) {
                console.log("errors are ", errors)
                setFormErrors(errors)
                return
            }
            setFormErrors([]);
        }
        getPropertiesOnMount()
    }, [])
    // console.log("favorites are ", favorites)
    async function toggleFavorites(favoriteData) {
        if (!currentUser) {
            navigate('/login')
        } else {
            console.log("favorites!!! are ", favorites)
            // console.log("in addtofavorites,favoriteData", favoriteData)
            await AirbnbApi.toggleFavorites(AirbnbApi.token, favoriteData);
            setFavorites(await AirbnbApi.getFavorites(AirbnbApi.token))
            // setNewStr("HELLO")
            // setFavorites([])
            console.log("favorites are ", favorites)
        }
    }

    if (!properties && favorites !== null) {
        return <p>Loading &hellip;</p>;
    }
    return (
        <div className="">
            <h1>{newStr}</h1>
            {formErrors.length
                ? <Alert type="danger" messages={["Please fill out all required fields"]} />
                : < PropertyList properties={properties} checkIn={checkin}
                    checkOut={checkout}
                    favorites={favorites}
                    toggleFavorites={toggleFavorites} />
            }
        </div>
    )
}

export default ProperyListRoute