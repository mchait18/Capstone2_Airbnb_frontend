import React, { useState, useContext } from "react";
import Alert from "./common/Alert";
import AirbnbApi from "./AirbnbApi"
import UserContext from "./auth/UserContext";

function ProfileForm() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    const [formCompleted, setFormCompleted] = useState(false);

    // console.debug(
    //     "SignupForm",
    //     "signup=", typeof signup,
    //     "formData=", formData,
    //     "formErrors=", formErrors,
    // );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
        setFormErrors([]);
    }

    /** on form submit:
     * - attempt save to backend & report any errors
     * - if successful
     *   - clear previous error messages and password
     *   - show save-confirmed message
     *   - set current user info throughout the site
     */

    async function handleSubmit(e) {
        e.preventDefault();
        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        };
        let username = formData.username;
        let updatedUser;
        try {
            updatedUser = await AirbnbApi.saveProfile(username, profileData);
        } catch (errors) {
            //debugger;
            setFormErrors(errors);
            return;
        }
        setFormData(f => ({ ...f, password: "" }));
        setFormErrors([]);
        setFormCompleted(true);

        // trigger reloading of user information throughout the site
        setCurrentUser(updatedUser);
    }
    //if form is submitted, redirect to home page. Otherwise, load form
    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h3>Profile</h3>
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
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>First name</label>
                            <input
                                name="firstName"
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last name</label>
                            <input
                                name="lastName"
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
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
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm password to make changes:</label>
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
                        {formCompleted ?
                            <Alert type="success" messages={["Updated successfully."]} />
                            : null}
                        <button
                            type="submit"
                            className="btn btn-primary btn-block mt-4"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default ProfileForm;