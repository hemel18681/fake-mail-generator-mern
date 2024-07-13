import React, { useState } from 'react';
import GenerateEmail from './GenerateEmail';
import ViewEmails from './ViewEmails';

const App = () => {
  const [email, setEmail] = useState('');

  return (
    <div>
      <h1>Fake Email Generator</h1>
      <GenerateEmail setEmail={setEmail} />
      {email && <ViewEmails email={email} />}
    </div>
  );
};

export default App;