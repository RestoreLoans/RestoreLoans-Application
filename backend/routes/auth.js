const express = require('express');
const router = express.Router();
const remoteApi = require('../services/remoteApiService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../middleware/authMiddleware');

router.post('/register', async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const result = await remoteApi.post('/register', { ...rest, password: hashed });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const remoteResult = await remoteApi.post('/login', req.body);
    // Assuming remote API returns user object and hashed password
    const { user, token } = remoteResult;
    // If remote issues its own token, you can use it or re-sign it:
    const ourToken = generateToken({ id: user._id, email: user.email });
    res.json({ user, token: ourToken });
  } catch (err) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
