const express = require('express');
const auth = require('../middleware/auth');
const Payment = require('../models/Payment');
const Loan = require('../models/Loan');

const router = express.Router();

// Make payment
router.post('/', auth, async (req, res) => {
  try {
    const { loanId, amount, paymentMethod } = req.body;
    
    // Check if loan exists and belongs to user
    const loan = await Loan.findOne({ _id: loanId, userId: req.user._id });
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    
    // Create payment record
    const payment = new Payment({
      userId: req.user._id,
      loanId,
      amount,
      paymentMethod,
      status: 'completed',
      transactionId: 'TXN_' + Date.now()
    });
    
    await payment.save();
    
    // Update loan balance
    loan.balance -= amount;
    if (loan.balance <= 0) {
      loan.status = 'completed';
      loan.balance = 0;
    }
    await loan.save();
    
    res.json({ message: 'Payment processed successfully', payment });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get payment history
router.get('/', auth, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user._id })
      .populate('loanId', 'loanType amount')
      .sort({ paymentDate: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;