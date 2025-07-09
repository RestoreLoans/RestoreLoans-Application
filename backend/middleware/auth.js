const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;

// routes/user.js
const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get/Update bank accounts
router.get('/bank-accounts', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.bankAccounts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/bank-accounts', auth, async (req, res) => {
  try {
    const { accountNumber, bankName, accountType, isDefault } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (isDefault) {
      user.bankAccounts.forEach(account => account.isDefault = false);
    }
    
    user.bankAccounts.push({
      accountNumber,
      bankName,
      accountType,
      isDefault
    });
    
    await user.save();
    res.json({ message: 'Bank account added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;