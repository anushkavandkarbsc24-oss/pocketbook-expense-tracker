import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import StatusMessage from '../components/StatusMessage';
import ExpensePieChart from '../components/ExpensePieChart';
import MonthlyBarChart from '../components/MonthlyBarChart';
import { formatCurrency, formatDate, getErrorMessage } from '../utils/helpers';

function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Runs once when the page opens: fetch all dashboard numbers
  useEffect(() => {
    api
      .get('/dashboard')
      .then((res) => setData(res.data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <StatusMessage type="loading" message="Loading your dashboard..." />;
  if (error) return <StatusMessage type="error" message={error} />;

  const isNegative = data.balance < 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-ink-900">Hi, {user.name.split(' ')[0]}</h1>
        <p className="text-sm text-slate-500">Here is where your money stands today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total balance" value={formatCurrency(data.balance)} tone={isNegative ? 'expense' : 'neutral'} hint="Income minus expenses" />
        <StatCard label="Total income" value={formatCurrency(data.totalIncome)} tone="income" />
        <StatCard label="Total expenses" value={formatCurrency(data.totalExpense)} tone="expense" />
        <StatCard
          label="Savings rate"
          value={`${data.savingsRate}%`}
          tone={data.savingsRate < 0 ? 'expense' : 'income'}
          hint="Share of income you kept"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card">
          <h2 className="mb-4 font-bold text-ink-900">Income vs expenses, last 6 months</h2>
          <MonthlyBarChart data={data.monthly} />
        </section>
        <section className="card">
          <h2 className="mb-4 font-bold text-ink-900">Spending by category</h2>
          <ExpensePieChart data={data.expenseByCategory} />
        </section>
      </div>

      <section className="card">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-bold text-ink-900">Recent activity</h2>
          <div className="flex gap-3 text-sm font-semibold">
            <Link to="/income" className="text-income hover:underline">Add income</Link>
            <Link to="/expenses" className="text-expense hover:underline">Add expense</Link>
          </div>
        </div>
        {data.recent.length === 0 ? (
          <StatusMessage type="empty" message="Nothing here yet. Add your first income or expense." />
        ) : (
          <ul className="divide-y divide-slate-100">
            {data.recent.map((t) => (
              <li key={`${t.type}-${t._id}`} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink-900">{t.title}</p>
                  <p className="text-xs text-slate-500">{t.category} • {formatDate(t.date)}</p>
                </div>
                <span className={`shrink-0 text-sm font-bold ${t.type === 'income' ? 'text-income' : 'text-expense'}`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
