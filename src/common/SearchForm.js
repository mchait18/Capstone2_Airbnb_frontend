import React, { useState } from "react";
import "./SearchForm.css"


const SearchForm = ({ searchFor }) => {
    const [formData, setFormData] = useState({
        location: "",
        checkin: "",
        checkout: "",
        adults: 1
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }
    async function handleSubmit(e) {
        e.preventDefault();
        searchFor(formData)

        setFormData({
            location: "",
            checkin: "",
            checkout: "",
            adults: 1
        })
    }
    return (
        <div className="SearchForm mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <label htmlFor="location">* Where</label>
                <input
                    className="form-control form-control-lg flex-grow-1"
                    onChange={handleChange}
                    type="text"
                    name="location"
                    value={formData.location}
                    placeholder="Search Destinations"
                    required
                    id="location"
                />
                <label htmlFor="checkin">* Check in</label>
                <input
                    className="form-control form-control-lg flex-grow-1"
                    id="checkin"
                    type="date"
                    name="checkin"
                    placeholder="Add dates"
                    onChange={handleChange}
                    required
                    value={formData.checkin}
                />
                <label htmlFor="checkout">* Check out</label>
                <input
                    className="form-control form-control-lg flex-grow-1"
                    id="checkout"
                    type="date"
                    name="checkout"
                    placeholder="Add dates"
                    onChange={handleChange}
                    required
                    value={formData.checkout}
                />
                <label htmlFor="adults">* Number of Guests</label>
                <input
                    className="form-control form-control-lg flex-grow-1"
                    id="adults"
                    type="number"
                    name="adults"
                    placeholder="Add guests"
                    onChange={handleChange}
                    required
                    value={formData.adults}
                />
                {/* <button type="submit" ><i class="fa fa-search"></i></button> */}

                <button type="submit" className="btn btn-lg btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}
export default SearchForm;