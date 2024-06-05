import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./BookingForm.css"
import AirbnbApi from "../AirbnbApi";
import Alert from "../common/Alert";
import { v4 as uuid } from 'uuid';
import UserContext from "../auth/UserContext";

const BookingForm = ({ propertyId, checkIn, checkOut, createBooking }) => {
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const [formErrors, setFormErrors] = useState([]);
    const [formData, setFormData] = useState({
        checkIn: checkIn,
        checkOut: checkOut,
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
            try {
                const priceRes = await AirbnbApi.checkPrice({
                    propertyId: propertyId,
                    checkIn: formData.checkIn,
                    checkOut: formData.checkOut,
                    adults: formData.adults
                })
                setPrice(priceRes)
            } catch (errors) {
                console.log("errors are ", errors)
                setFormErrors(errors)
                return
            }
        }
        if (formData.checkIn && formData) {
            const checkInDate = new Date(formData.checkIn)
            const checkOutDate = new Date(formData.checkOut)
            if (checkInDate < checkOutDate) {
                getPrice();
            }
        }
    }, [formData])

    async function handleSubmit(e) {
        e.preventDefault();
        if (!currentUser) {
            navigate('/login')
        } else {
            createBooking({
                bookingId: uuid(),
                priceTitle: price.data.accommodationCostTitle,
                cleaningFee: price.data.cleaningFeeFormatted,
                totalPrice: price.data.accommodationCostFormatted,
                ...formData
            })

            setFormData({
                checkIn: "",
                checkOut: "",
                adults: 1
            })
        }
    }

    return (
        <div className="SearchForm mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <label htmlFor="checkIn">* Check in</label>
                <input
                    className="form-control form-control-lg flex-grow-1"
                    id="checkin"
                    type="date"
                    name="checkIn"
                    placeholder="Add dates"
                    onChange={handleChange}
                    value={formData.checkIn}
                />
                <label htmlFor="checkOut">* Check out</label>
                <input
                    className="form-control form-control-lg flex-grow-1"
                    id="checkout"
                    type="date"
                    name="checkOut"
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
                    onChange={handleChange}
                    value={formData.adults}
                />

                {price.message && price.message !== "Success"
                    ? <Alert type="danger" messages={[price.message]} />
                    : null
                }
                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }
                {price.data &&
                    (<div>
                        <h5>{price.data.accommodationCostTitle}</h5>
                        <h5>{price.data.cleaningFeeTitle} {price.data.cleaningFeeFormatted}</h5>
                        <h5><b>Total: {price.data.accommodationCostFormatted}</b></h5>
                        <button type="submit" className="btn btn-lg btn-primary">
                            Reserve
                        </button>
                    </div>)}
            </form>
        </div>
    )
}
export default BookingForm;