import { useState } from "react";
import AuthorForm from "../components/AuthorForm";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddAuthor() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const createAuthor = (author) => { // This function gets passed through props as the function to call onClick 'submit' button
    axios
      .post("http://localhost:8000/api/authors", author)
      .then((newAuthor) => { // Successfully created new document in DB
        // console.log(newAuthor);
        navigate("/authors/");
      })
      .catch((err) => {
        const errorResponse = err.response.data.errors;
        // At this point, errorResponse will be an object that looks something like this:
        // { firstName: {name: 'ValidatorError', message: 'First name is required', properties : {...}, etc.}}
        const errorArray = [];
        for (const key of Object.keys(errorResponse)) {
          // so we iterate through the keys: 'firstName', 'lastName'
          errorArray.push(errorResponse[key].message); // push the 'message' part of the given property onto the array of messages
        }
        setErrors(errorArray);
      });
  };

  return (
    <div className="container">
      <h1>Favorite authors</h1>
      <Link to="/authors">Home</Link>
      <h2>Add a new author:</h2>
      <AuthorForm
        initialFirstName=""
        initialLastName=""
        onSubmitCallback={createAuthor}
        errors={errors}
      />
    </div>
  );
}

export default AddAuthor;
