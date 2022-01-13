import axios from "axios";
import React, { useState } from "react";
import DeleteContact from "./DeleteContact";

const Contact = ({ contact }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditingJob] = useState("");

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return newDate;
  };

  const handleEdit = () => {
    const data = {
      name: contact.name,
      job: editedJob ? editedJob : contact.job,
      date: contact.date,
    };

    axios.put("http://localhost:3003/contacts/" + contact.id, data);
    setIsEditing(false);
  };
  return (
    <div className="contact">
      <div className="contact-header">
        <h3>{contact.name}</h3>
        <em>Creation date: {dateParser(contact.date)}</em>
      </div>

      {isEditing ? (
        <input
          onChange={(e) => setEditingJob(e.target.value)}
          autoFocus
          defaultValue={contact.job}
        ></input>
      ) : (
        <p>{editedJob ? editedJob : contact.job}</p>
      )}
      <div className="btn-container">
        {isEditing ? (
          <button onClick={handleEdit}>Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <DeleteContact id={contact.id} />
      </div>
    </div>
  );
};

export default Contact;
