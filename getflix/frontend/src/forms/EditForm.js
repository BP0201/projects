import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../other/Alert";

function EditForm({ updateUser }) {
  const navigate = useNavigate();
  const { username } = useParams();
  const [formData, setFormData] = useState({
    username,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  // console.debug(
  //     "LoginForm",
  //     "login=", typeof login,
  //     "formData=", formData,
  //     "formErrors", formErrors,
  // );

  // called when form is submitted
  async function handleSubmit(evt) {
    // prevent page refresh
    evt.preventDefault();
    let result = await updateUser(formData);
    if (result.success) {
      // redirect if successful
      navigate("/");
    } else {
      setFormErrors(["Something went wrong"]);
    }
  }

  // updates form data state when value of inputs change
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
  }

  return (
      <div className="EditForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h2 className="my-4">Edit Profile</h2>

          <div className="card shadow">
            <div className="card-body">
              <form onSubmit={handleSubmit}>

                <div className="form-group">
                  <label>New Password</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
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
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default EditForm;
