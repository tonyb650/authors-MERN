import React from 'react'
import axios from 'axios'

function DeleteButton(props) {
    const { id, onDeleteCallback } = props;

    const handleDeleteClick = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/authors/${id}`)
        .then(deletedAuthor => console.log(deletedAuthor))
        .catch(err => console.log(err))
        onDeleteCallback(id);
    }

  return (
    <button className="btn btn-danger" onClick={handleDeleteClick}>
        Delete
    </button>
  )
}

export default DeleteButton