import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../other/Alert";
import BackendAPI from "../apis/BackendApi";

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
    // firstName: "",
    // lastName: "",
    // email: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  // console.debug(
  //     "SignupForm",
  //     "signup=", typeof signup,
  //     "formData=", formData,
  //     "formErrors=", formErrors,
  // );

  // handle form submission
  async function handleSubmit(evt) {
    evt.preventDefault();
    if (formData.username.length < 3) {
      setFormErrors(formErrors => [...formErrors, "Username must be between 3-16 characters"])
    }
    if (formData.password.length < 5) {
      setFormErrors(formErrors => [...formErrors, "Password must be between 5-20 characters"])
    }
    const user = await BackendAPI.getCurrentUser(formData.username);
    console.log("User:", user)
    if (!(!user)) {
      // check if user already exists
      setFormErrors(formErrors => [...formErrors, "Username taken"])
    }
    const result = await signup(formData);
    if (result.success) {
      // redirect if successful
      navigate("/search");
    }
  }

  // handle input value change
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
      <div className="SignupForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h2 className="my-4">Sign Up</h2>
          <div className="card shadow">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                      minLength={3}
                      maxLength={16}
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
                      minLength={5}
                      maxLength={20}
                  />
                </div>

                {/* <div className="form-group">
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
                </div> */}

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }

                <button
                    type="submit"
                    className="btn btn-success float-right"
                    onSubmit={handleSubmit}
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default SignupForm;