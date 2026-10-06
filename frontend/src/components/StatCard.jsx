// Props: label, value, hint, tone ('neutral' | 'income' | 'expense')
const tones = {
  neutral: 'text-ink-900',
  income: 'text-income',
  expense: 'text-expense',
};

function StatCard({ label, value, hint, tone = 'neutral' }) {
  return (
    <div className="card">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className={`mt-2 truncate text-2xl font-extrabold ${tones[tone]}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export default StatCard;
