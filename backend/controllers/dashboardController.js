const Income = require('../models/Income');
const Expense = require('../models/Expense');

const sum = (list) => list.reduce((total, item) => total + item.amount, 0);

// GET /api/dashboard - everything the dashboard page needs in one request
const getDashboard = async (req, res, next) => {
  try {
    const [incomes, expenses] = await Promise.all([
      Income.find({ user: req.user._id }).lean(),
      Expense.find({ user: req.user._id }).lean(),
    ]);

    const totalIncome = sum(incomes);
    const totalExpense = sum(expenses);
    const balance = totalIncome - totalExpense;
    // Savings rate = share of income that was not spent (0 if there is no income)
    const savingsRate = totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0;

    // Spending per category (for the pie chart)
    const byCategory = {};
    expenses.forEach((e) => {
      byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
    });
    const expenseByCategory = Object.entries(byCategory).map(([name, value]) => ({ name, value }));

    // Last 6 months of income vs expense (for the bar chart)
    const monthly = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      monthly.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        month: d.toLocaleString('en-US', { month: 'short' }),
        income: 0,
        expense: 0,
      });
    }
    const addToMonth = (list, field) =>
      list.forEach((t) => {
        const d = new Date(t.date);
        const slot = monthly.find((m) => m.key === `${d.getFullYear()}-${d.getMonth()}`);
        if (slot) slot[field] += t.amount;
      });
    addToMonth(incomes, 'income');
    addToMonth(expenses, 'expense');

    // 6 most recent transactions of both kinds
    const recent = [
      ...incomes.map((t) => ({ ...t, type: 'income' })),
      ...expenses.map((t) => ({ ...t, type: 'expense' })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6);

    res.json({
      totalIncome,
      totalExpense,
      balance,
      savingsRate,
      expenseByCategory,
      monthly: monthly.map(({ key, ...rest }) => rest),
      recent,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard };
