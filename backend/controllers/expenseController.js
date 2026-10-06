const Expense = require('../models/Expense');
const { EXPENSE_CATEGORIES } = require('../config/categories');
const createTransactionController = require('./transactionController');

module.exports = createTransactionController(Expense, EXPENSE_CATEGORIES, 'Expense');
