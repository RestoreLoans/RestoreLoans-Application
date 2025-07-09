const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loanType: { type: String, enum: ['Home', 'Personal', 'Auto', 'Business'], required: true },
  amount: { type: Number, required: true },
  term: { type: Number, required: true }, // in months
  interestRate: { type: Number, default: 12 }, // annual percentage
  totalAmount: { type: Number, required: true },
  monthlyPayment: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'active', 'completed'], default: 'pending' },
  balance: { type: Number, required: true },
  applicationDate: { type: Date, default: Date.now },
  approvalDate: Date,
  documents: [{
    name: String,
    filename: String,
    uploadDate: { type: Date, default: Date.now },
    remarks: String
  }]
});

module.exports = mongoose.model('Loan', loanSchema);