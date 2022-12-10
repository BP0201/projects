import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../other/Alert";

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  // console.debug(
  //     "LoginForm",
  //     "login=", typeof login,
  //     "formData=", formData,
  //     "formErrors", formErrors,
  // );

  // handles form submission
  async function handleSubmit(evt) {
    evt.preventDefault();
    if (formData.username.length < 3) {
      setFormErrors(formErrors => [...formErrors, "Username must be between 3-16 characters"])
    }
    if (formData.password.length < 5) {
      setFormErrors(formErrors => [...formErrors, "Password must be between 5-20 characters"])
    }
    let result = await login(formData);
    if (result.success) {
      // redirect if successful
      navigate("/");
    } else {
      setFormErrors(formErrors => [...formErrors, "Invalid username/password"]);
    }
  }

  // handles formData state change when input values change
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
  }

  return (
      <div className="LoginForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h2 className="my-4">Log In</h2>

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
                      autoComplete="username"
                      minLength={3}
                      maxLength={16}
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
                      autoComplete="current-password"
                      minLength={5}
                      maxLength={20}
                      required
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                <button
                    className="btn btn-success float-right"
                    onSubmit={handleSubmit}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default LoginForm;
