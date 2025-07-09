const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiUrl = process.env.API_CONNECTION || 'https://45-151-153-20.cloud-xip.com';

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error connecting to API');
  }
});

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/loans', require('./routes/loans'));
app.use('/api/payments', require('./routes/payments'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
