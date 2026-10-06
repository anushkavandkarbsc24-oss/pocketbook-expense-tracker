const mongoose = require('mongoose');
const { INCOME_CATEGORIES } = require('../config/categories');

const incomeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true, maxlength: 60 },
    amount: { type: Number, required: true, min: 0.01 },
    category: { type: String, required: true, enum: INCOME_CATEGORIES },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Income', incomeSchema);
