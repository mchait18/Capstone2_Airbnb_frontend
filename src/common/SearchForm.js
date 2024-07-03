import React, { useState } from "react";

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
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>* Where</label>
                            <input
                                className="form-control form-control-lg flex-grow-1"
                                onChange={handleChange}
                                type="text"
                                name="location"
                                value={formData.location}
                                placeholder="Search Destinations"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label >* Check in</label>
                            <input
                                className="form-control form-control-lg flex-grow-1"
                                type="date"
                                name="checkin"
                                onChange={handleChange}
                                required
                                value={formData.checkin}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="checkout">* Check out</label>
                            <input
                                className="form-control form-control-lg flex-grow-1"
                                id="checkout"
                                type="date"
                                name="checkout"
                                onChange={handleChange}
                                required
                                value={formData.checkout}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="adults">* Number of Guests</label>
                            <input
                                className="form-control form-control-lg flex-grow-1"
                                id="adults"
                                type="number"
                                name="adults"
                                onChange={handleChange}
                                required
                                value={formData.adults}
                            />
                        </div>
                        <button type="submit" className="btn btn-lg btn-secondary mt-3">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SearchForm;