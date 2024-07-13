import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewEmails = ({ email }) => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      const response = await axios.get(`http://localhost:5000/emails/${email}`);
      setEmails(response.data);
    };
    fetchEmails();
  }, [email]);

  return (
    <div>
      <h2>Received Emails for {email}</h2>
      <ul>
        {emails.map((mail, index) => (
          <li key={index}>
            <p>From: {mail.from}</p>
            <p>Subject: {mail.subject}</p>
            <p>{mail.body}</p>
            <p>{new Date(mail.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewEmails;