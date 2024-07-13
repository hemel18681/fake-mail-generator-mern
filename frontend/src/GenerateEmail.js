import React, { useState } from 'react';
import axios from 'axios';

const GenerateEmail = () => {
  const [email, setEmail] = useState('');

  const generateEmail = async () => {
    const response = await axios.post('http://localhost:5000/generate-email');
    setEmail(response.data.address);
  };

  return (
    <div>
      <button onClick={generateEmail}>Generate Email</button>
      {email && <p>Your fake email: {email}</p>}
    </div>
  );
};

export default GenerateEmail;