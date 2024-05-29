import React, { useState, useContext, useEffect } from "react";
// import "./BookingForm.css"
import UserContext from "../auth/UserContext";
import AirbnbApi from "../AirbnbApi";


const BookingForm = ({ createBooking, propertyId }) => {
    const { currentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        checkIn: "",
        checkOut: "",
        adults: 1
    });
    const [price, setPrice] = useState({})

    async function handleChange(e) {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    useEffect(() => {
        async function getPrice() {
            const priceRes = await AirbnbApi.checkPrice({
                propertyId: propertyId,
                checkin: formData.checkIn,
                checkout: formData.checkOut,
                adults: formData.adults
            })
            setPrice(priceRes)
        }
        if ((formData.checkIn !== "") && (formData.checkOut !== ""))
            getPrice();
    }, [formData])

    async function handleSubmit(e) {
        e.preventDefault();
        // createBooking({username: currentUser.username, ...formData})

        setFormData({
            checkIn: "",
            checkOut: "",
            adults: 1
        })
    }

    return (
        <div className="SearchForm mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <label htmlFor="checkin">* Check in</label>
                <input
                    className="form-control form-control-lg flex-grow-1"
                    id="checkin"
                    type="date"
                    name="checkin"
                    placeholder="Add dates"
                    onChange={handleChange}
                    value={formData.checkIn}
                />
                <label htmlFor="checkout">* Check out</label>
                <input
                    className="form-control form-control-lg flex-grow-1"
                    id="checkout"
                    type="date"
                    name="checkout"
                    placeholder="Add dates"
                    onChange={handleChange}
                    value={formData.checkOut}
                />
                <label htmlFor="adults">* Guests</label>
                <input
                    className="form-control form-control-lg flex-grow-1"
                    id="adults"
                    type="number"
                    name="adults"
                    // placeholder="Add guests"
                    onChange={handleChange}
                    value={formData.adults}
                />

                <button type="submit" className="btn btn-lg btn-primary">
                    Check Availibility
                </button>
                {price &&
                    (<div>
                        <p>You won't be charged yet</p>
                        <h5>{price.accomodationCostTitle}</h5>
                        <h5>{price.cleaningFeeTitle} {price.cleaningFeeFormatted}</h5>
                        <h5><b>Total before taxes {price.accomodationCostFormatted}</b></h5>
                    </div>)}
                <button type="submit" className="btn btn-lg btn-primary">
                    Reserve
                </button>
            </form>
        </div>
    )
}
export default BookingForm;