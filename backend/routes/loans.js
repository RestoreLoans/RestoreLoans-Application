const express = require('express');
const auth = require('../middleware/auth');
const Loan = require('../models/Loan');

const router = express.Router();

// Get user loans
router.get('/', auth, async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user._id });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Apply for loan
router.post('/apply', auth, async (req, res) => {
  try {
    const { loanType, amount, term } = req.body;
    
    // Calculate loan details
    const interestRate = 12; // 12% annual
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    const totalAmount = monthlyPayment * term;
    
    const loan = new Loan({
      userId: req.user._id,
      loanType,
      amount,
      term,
      interestRate,
      totalAmount,
      monthlyPayment,
      balance: totalAmount,
      status: 'pending'
    });
    
    await loan.save();
    res.status(201).json({ message: 'Loan application submitted successfully', loan });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Calculate loan
router.post('/calculate', (req, res) => {
  try {
    const { amount, term } = req.body;
    const interestRate = 12; // 12% annual
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    const totalAmount = monthlyPayment * term;
    
    res.json({
      amount,
      term,
      interestRate,
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;