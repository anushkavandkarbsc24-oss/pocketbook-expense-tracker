import StatusMessage from './StatusMessage';
import { formatCurrency, formatDate } from '../utils/helpers';

// Props: items, type ('income' | 'expense'), onDelete(id), emptyMessage
function TransactionList({ items, type, onDelete, emptyMessage }) {
  if (items.length === 0) return <StatusMessage type="empty" message={emptyMessage} />;

  const isIncome = type === 'income';

  return (
    <ul className="divide-y divide-slate-100">
      {items.map((item) => (
        <li key={item._id} className="flex items-center justify-between gap-3 py-3">
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink-900">{item.title}</p>
            <p className="text-xs text-slate-500">
              {item.category} • {formatDate(item.date)}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className={`text-sm font-bold ${isIncome ? 'text-income' : 'text-expense'}`}>
              {isIncome ? '+' : '-'}
              {formatCurrency(item.amount)}
            </span>
            <button
              onClick={() => onDelete(item._id)}
              className="rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-500 transition hover:border-rose-300 hover:text-expense"
              aria-label={`Delete ${item.title}`}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;
