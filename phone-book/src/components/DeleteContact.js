import axios from "axios";
import React from "react";

const DeleteContact = ({ id }) => {
  const handleDelete = () => {
    axios.delete("http://localhost:3003/contacts/" + id);
    window.location.reload();
  };

  return (
    <div>
      <button
        onClick={() => {
          if (window.confirm("Are you sure ?")) {
            handleDelete();
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteContact;
