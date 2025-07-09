const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const remoteApi = require('../services/remoteApiService');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await remoteApi.get('/loans', req.userToken);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const result = await remoteApi.post('/loans', req.body, req.userToken);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await remoteApi.get(`/loans/${req.params.id}`, req.userToken);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
