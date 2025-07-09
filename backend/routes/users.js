const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const remoteApi = require('../services/remoteApiService');

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const result = await remoteApi.get('/users/profile', req.userToken);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const result = await remoteApi.put('/users/profile', req.body, req.userToken);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
