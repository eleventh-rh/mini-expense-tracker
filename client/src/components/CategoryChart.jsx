import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#8b5cf6'];

const CategoryChart = ({ summary }) => {
  if (!summary || !summary.byCategory) return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse h-48" />
  );

  const data = Object.entries(summary.byCategory).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2)),
  }));

  if (data.length === 0) return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center h-48">
      <p className="text-gray-400 text-sm">No data to display</p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        🍕 Spending by Category
      </h2>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;