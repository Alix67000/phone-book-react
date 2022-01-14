import React, { useEffect, useState } from "react";
import axios from "axios";
import Contact from "../components/Contact";

const Home = () => {
  const [contactData, setContactData] = useState([]);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:3003/contacts")
      .then((res) => setContactData(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("yes");

    axios
      .post("http://localhost:3003/contacts", {
        name,
        job,
        date: Date.now(),
      })
      .then(() => {
        setName("");
        setJob("");
        getData();
      });
  };

  return (
    <div className="contact-container">
      <h1>Phone-book</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
          value={name}
        />
        <input
          onChange={(e) => setJob(e.target.value)}
          type="text"
          placeholder="Job"
          value={job}
        />
        <input type="submit" value="Add" />
      </form>
      <ul>
        {contactData
          .sort((a, b) => b.date - a.date)
          .map((contact) => (
            <Contact key={contact.id} contact={contact} />
          ))}
      </ul>
    </div>
  );
};

export default Home;
