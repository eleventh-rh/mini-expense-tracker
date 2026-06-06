import { getMonthStart, getToday } from '../utils/currency';

const CATEGORIES = ['All', 'Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

const FilterBar = ({ filters, onFilterChange }) => {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const setThisMonth = () => onFilterChange({
    ...filters, from: getMonthStart(), to: getToday()
  });

  const setLastMonth = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      .toISOString().split('T')[0];
    const lastDay = new Date(now.getFullYear(), now.getMonth(), 0)
      .toISOString().split('T')[0];
    onFilterChange({ ...filters, from: firstDay, to: lastDay });
  };

  const clearFilters = () => onFilterChange({
    category: 'All', from: '', to: ''
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">🔍 Filter Expenses</h2>
      <div className="flex flex-wrap gap-3 items-end">

        {/* Category filter */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* From date */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">From</label>
          <input
            type="date"
            value={filters.from}
            onChange={(e) => handleChange('from', e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* To date */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">To</label>
          <input
            type="date"
            value={filters.to}
            onChange={(e) => handleChange('to', e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Quick filter buttons */}
        <div className="flex gap-2">
          <button onClick={setThisMonth}
            className="px-3 py-2 text-xs bg-indigo-50 text-indigo-600
                       rounded-lg hover:bg-indigo-100 transition">
            This Month
          </button>
          <button onClick={setLastMonth}
            className="px-3 py-2 text-xs bg-gray-50 text-gray-600
                       rounded-lg hover:bg-gray-100 transition">
            Last Month
          </button>
          <button onClick={clearFilters}
            className="px-3 py-2 text-xs bg-red-50 text-red-500
                       rounded-lg hover:bg-red-100 transition">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;