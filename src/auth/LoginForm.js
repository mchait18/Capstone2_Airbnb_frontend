import React, { useState } from "react";
import Alert from "../common/Alert";
import { useNavigate, Link } from "react-router-dom";

function LoginForm({ login }) {
    const navigate = useNavigate();
    const INITIAL_STATE = {
        username: "",
        password: ""
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
    async function handleSubmit(e) {
        e.preventDefault();
        let result = await login(formData)
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
        <div className="LoginForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h2 className="mb-3, mt-5">Log in</h2>
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
                                />
                            </div>

                            {formErrors.length
                                ? <Alert type="danger" messages={formErrors} />
                                : null
                            }
                            <button
                                type="submit"
                                className="btn btn-secondary float-right mt-3 mb-3"
                                onSubmit={handleSubmit}
                            >
                                Submit
                            </button>
                            <br></br>
                            <Link style={{ textDecoration: 'none' }} to={`/signup`} >New User? Sign up <u>here</u></Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default LoginForm;