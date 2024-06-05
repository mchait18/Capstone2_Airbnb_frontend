import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import AirbnbApi from "../AirbnbApi";
import PropertyList from "./PropertyList";
import Alert from "../common/Alert";

function ProperyListRoute() {
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const location = query.get("location")
    const checkin = query.get("checkin")
    const checkout = query.get("checkout")
    const adults = query.get("adults")
    const [properties, setProperties] = useState(null);
    const [formErrors, setFormErrors] = useState([]);

    useEffect(() => {
        async function getPropertiesOnMount() {
            try {
                setProperties(await AirbnbApi.getProperties({
                    location, checkin, checkout, adults
                }))
            } catch (errors) {
                console.log("errors are ", errors)
                setFormErrors(errors)
                return
            }
            setFormErrors([]);
        }
        getPropertiesOnMount()
    }, [])

    if (!properties) {
        return <p>Loading &hellip;</p>;
    }
    return (
        <div className="">
            {formErrors.length
                ? <Alert type="danger" messages={["Please fill out all required fields"]} />
                : < PropertyList properties={properties} checkIn={checkin}
                    checkOut={checkout} />
            }
        </div>
    )
}

export default ProperyListRoute