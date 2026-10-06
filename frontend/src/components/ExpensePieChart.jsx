import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatusMessage from './StatusMessage';
import { formatCurrency } from '../utils/helpers';

const COLORS = ['#0f766e', '#e5484d', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#64748b', '#f97316'];

// Props: data = [{ name, value }]
function ExpensePieChart({ data }) {
  if (data.length === 0) return <StatusMessage type="empty" message="Add an expense to see where your money goes." />;

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={2}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpensePieChart;
