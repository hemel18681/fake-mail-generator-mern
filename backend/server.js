const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://0.0.0.0:27017/fakeEmailDB')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const EmailSchema = new mongoose.Schema({
  address: { type: String, unique: true },
  receivedEmails: [{ from: String, subject: String, body: String, date: Date }]
});

const Email = mongoose.model('Email', EmailSchema);

app.post('/generate-email', async (req, res) => {
  try {
    const newAddress = `${Math.random().toString(36).substring(7)}@yourdomain.com`;
    const newEmail = new Email({ address: newAddress });
    await newEmail.save();
    res.json({ address: newAddress });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate email address' });
  }
});

app.post('/receive-email', async (req, res) => {
  const { to, from, subject, body } = req.body;
  
  try {
    const email = await Email.findOne({ address: to });

    if (email) {
      email.receivedEmails.push({ from, subject, body, date: new Date() });
      await email.save();
      res.json({ message: 'Email received and stored' });
    } else {
      res.status(404).json({ message: 'Address not found' });
    }
  } catch (error) {
    console.error('Error receiving email:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});





