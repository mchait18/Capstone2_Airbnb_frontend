import React, { useState } from "react";
import Alert from "../common/Alert";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";

function SignupForm({ signup }) {
    const navigate = useNavigate();
    // const [isChecked, setIsChecked] = useState(false);
    const INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        isOwner: false
    }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleCheckboxChange = (e) => {
        setFormData(formData => ({
            ...formData, isOwner: !formData.isOwner
        }))
    };

    async function handleSubmit(e) {
        e.preventDefault();

        let result = await signup({ id: uuid(), ...formData })
        if (result.success) {
            navigate("/")
        }
        else {
            setFormErrors(result.errors);
        }
        setFormData(INITIAL_STATE)

    }
    //if form is submitted, redirect to home page. Otherwise, load form
    return (
        <div className="SignupForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h2 className="mb-3, mt-5">Sign Up</h2>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>First name</label>
                                <input
                                    name="firstName"
                                    className="form-control"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Last name</label>
                                <input
                                    name="lastName"
                                    className="form-control"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div >
                                <label style={{ height: "2rem" }}> Owner  <input
                                    type="checkbox"
                                    className="mt-3"
                                    name="isOwner"
                                    value={formData.isOwner}
                                    onClick={handleCheckboxChange}
                                />

                                </label>
                            </div>

                            {formErrors.length
                                ? <Alert type="danger" messages={formErrors} />
                                : null
                            }
                            <button
                                type="submit"
                                className="btn btn-secondary float-right mt-3"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SignupForm;