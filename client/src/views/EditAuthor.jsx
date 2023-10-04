import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthorForm from "../components/AuthorForm";

function EditAuthor(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);
  const [authorLoaded, setAuthorLoaded] = useState(false);
  const [getError, setGetError] = useState(""); // Initialize this in case of an error on our axios.get

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/authors/${id}`) // We get the single author so as to create initial values for the form fields
      .then((oneAuthor) => {
        setFirstName(oneAuthor.data.firstName);
        setLastName(oneAuthor.data.lastName);
        setAuthorLoaded(true); // this flag should trigger a re-render of the page now that we have our values set for our for fields
      })
      .catch((err) => {
        console.log(err);
        setGetError(["We're sorry, but we could not find the author you are looking for. Would you like to add this author to our database?"])
      });
  }, []);
  // console.log(id);

  function editAuthor(author) { // this function will be passed to the Form component through props
    axios
      .patch(`http://localhost:8000/api/authors/${id}`, author)
      .then((updatedAuthor) => {
        navigate("/authors");
      })
      .catch((err) => { // see the 'AddAuthor'component for notes on this
        const errorResponse = err.response.data.errors; // I bet we could make code more DRY by lifting this up and passing it back down both here and in AddAuthor.jsx
        const errorArray = [];
        for (const key of Object.keys(errorResponse)) {
          errorArray.push(errorResponse[key].message);
        }
        setErrors(errorArray);
      });
  }
  return (
    <div className="container">
      <h1>Favorite authors</h1>
      <Link to="/authors">Home</Link>
      <h2>Edit author:</h2>
      {getError && ( /* empty string will be falsey */
        <p className="alert alert-danger">{getError} <Link to="/authors/new">Add Author</Link></p>
      )}
      {authorLoaded && ( /* Logical AND operator here. "It works because in JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false." */
        <AuthorForm
          initialFirstName={firstName}
          initialLastName={lastName}
          onSubmitCallback={editAuthor}
          errors={errors}
        />
      )}
    </div>
  );
}

export default EditAuthor;
