import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DeleteButton from "../components/DeleteButton";

function AuthorList() {
  const navigate = useNavigate();
  const [authorArray, setAuthorArray] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/authors")
      .then((res) => {
        let sortedArray = res.data.sort((a, b) => {
          // we are sorting alphabetically by last name here. 'sortedArray' is going to be an array of 'author' objects
          let fa = a.lastName.toLowerCase(),
            fb = b.lastName.toLowerCase();
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
        // Done sorting, now we can set our authorArray to the *sorted* findAll()
        setAuthorArray(sortedArray);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleDelete(id) {
    // this is the callback that will passed through props to the DeleteButton component
    setAuthorArray(authorArray.filter((author) => author._id != id));
  }

  return (
    <div className="container">
      <h1>Favorite Authors</h1>
      <Link to="/authors/new">Add an author</Link>
      <h2>We have quotes by:</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authorArray.map((author) => {
            return (
              <tr key={author._id}>
                <td>
                  {author.lastName}, {author.firstName}
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/authors/edit/${author._id}`)}
                  >
                    Edit
                  </button>
                  <DeleteButton
                    id={author._id}
                    onDeleteCallback={handleDelete}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AuthorList;
