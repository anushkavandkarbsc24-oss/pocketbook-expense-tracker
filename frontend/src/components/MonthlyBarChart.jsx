import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../utils/helpers';

// Props: data = [{ month, income, expense }]
function MonthlyBarChart({ data }) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} width={60} />
          <Tooltip cursor={false} formatter={(value) => formatCurrency(value)} />
          <Legend />
          <Bar dataKey="income" name="Income" fill="#0f766e" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" name="Expenses" fill="#e5484d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyBarChart;