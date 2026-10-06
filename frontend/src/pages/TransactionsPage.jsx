import { useMemo, useState } from 'react';
import useTransactions from '../hooks/useTransactions';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import StatusMessage from '../components/StatusMessage';
import { formatCurrency } from '../utils/helpers';

// One page component reused for both Income and Expenses.
// The parent (Income.jsx / Expenses.jsx) passes everything through props.
function TransactionsPage({ type, title, subtitle, categories }) {
  const isIncome = type === 'income';
  const { items, loading, error, addItem, removeItem } = useTransactions(isIncome ? '/income' : '/expenses');

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [actionError, setActionError] = useState('');

  // MODIFICATION: search + category filter (recalculated only when inputs change)
  const filtered = useMemo(
    () =>
      items.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) &&
          (category === 'All' || item.category === category)
      ),
    [items, search, category]
  );

  const total = filtered.reduce((sum, item) => sum + item.amount, 0);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
    setActionError('');
    try {
      await removeItem(id);
    } catch (err) {
      setActionError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-ink-900">{title}</h1>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="card h-fit lg:col-span-1">
          <h2 className="mb-4 font-bold text-ink-900">{isIncome ? 'Add income' : 'Add expense'}</h2>
          <TransactionForm
            type={type}
            categories={categories}
            onSubmit={addItem}
            buttonLabel={isIncome ? 'Save income' : 'Save expense'}
          />
        </section>

        <section className="card lg:col-span-2">
          <div className="mb-4">
            <h2 className="font-bold text-ink-900">{isIncome ? 'Your income' : 'Your expenses'}</h2>
            <p className="text-sm text-slate-500">
              {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'} totalling{' '}
              <span className={`font-bold ${isIncome ? 'text-income' : 'text-expense'}`}>{formatCurrency(total)}</span>
            </p>
          </div>

          <div className="mb-3 grid gap-3 sm:grid-cols-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title"
              className="field"
              aria-label="Search by title"
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="field" aria-label="Filter by category">
              <option value="All">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <StatusMessage type="error" message={actionError} />

          {loading && <StatusMessage type="loading" message="Loading entries..." />}
          {error && <StatusMessage type="error" message={error} />}
          {!loading && !error && (
            <TransactionList
              items={filtered}
              type={type}
              onDelete={handleDelete}
              emptyMessage={
                items.length === 0
                  ? `No ${type} yet. Use the form to add your first entry.`
                  : 'No entries match your search.'
              }
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default TransactionsPage;