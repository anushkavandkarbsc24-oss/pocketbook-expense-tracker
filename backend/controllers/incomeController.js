const Income = require('../models/Income');
const { INCOME_CATEGORIES } = require('../config/categories');
const createTransactionController = require('./transactionController');

module.exports = createTransactionController(Income, INCOME_CATEGORIES, 'Income');
