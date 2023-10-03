import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function AuthorForm(props) {
  const { initialFirstName, initialLastName, onSubmitCallback, errors } = props;
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);

  const handleSubmit = (e) => {
    e.preventDefault();
    const author = { // create a little 'author' object to pass to onSubmitCallback
      firstName,
      lastName,
    };
    onSubmitCallback(author);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Author Name</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          Card subtitle
        </h6>
        <div className="card-text">
          {errors.map((err, index) => (
            <p className="alert alert-danger" key={index}>
              {err}
            </p>
          ))}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-group-text" id="firstName">
                First Name
              </span>
              <input
                type="text"
                className="form-control"
                id="firstName"
                aria-describedby="firstName"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={firstName}
              />
            </div>
            <div className="input-group">
              <span className="input-group-text" id="lastName">
                Last Name
              </span>
              <input
                type="text"
                className="form-control"
                id="lastName"
                aria-describedby="lastName"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                value={lastName}
              />
            </div>
            <Link to="/authors" className="btn btn-secondary">
              Cancel
            </Link>
            <button className="btn btn-primary">Submit</button>{" "}
            {/* Could conditionally change the button name here */}
          </form>{" "}
          {/* Could conditionally add the DeteteButton component here (for the edit page) */}
        </div>
      </div>
    </div>
  );
}

export default AuthorForm;