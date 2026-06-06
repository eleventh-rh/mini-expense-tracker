import { formatCurrency } from '../utils/currency';

const SummaryPanel = ({ summary }) => {
  if (!summary) return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse h-48" />
  );

  const { totalThisMonth, byCategory, highest } = summary;
  const categories = Object.entries(byCategory || {});

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        📊 This Month's Summary
      </h2>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Total Spent</p>
        <p className="text-3xl font-bold text-indigo-600">
          {formatCurrency(totalThisMonth || 0)}
        </p>
      </div>

      {categories.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">By Category</p>
          <div className="space-y-1">
            {categories.map(([cat, amount]) => (
              <div key={cat} className="flex justify-between text-sm">
                <span className="text-gray-600">{cat}</span>
                <span className="font-medium">{formatCurrency(amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {highest && highest.amount > 0 && (
        <div className="border-t pt-3 mt-3">
          <p className="text-sm text-gray-500">Highest Expense</p>
          <p className="font-semibold text-gray-800">
            {formatCurrency(highest.amount)}
            <span className="text-gray-400 font-normal ml-1">
              — {highest.category}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SummaryPanel;