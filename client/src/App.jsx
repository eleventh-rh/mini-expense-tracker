import { useState } from 'react';
import { useExpenses } from './hooks/useExpenses';
import { getMonthStart, getToday } from './utils/currency';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import FilterBar from './components/FilterBar';
import SummaryPanel from './components/SummaryPanel';
import CategoryChart from './components/CategoryChart';

function App() {
  const {
    expenses, summary, loading, error,
    fetchExpenses, addExpense, updateExpense, deleteExpense,
  } = useExpenses();

  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({
    category: 'All',
    from: getMonthStart(),
    to: getToday(),
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchExpenses(newFilters);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => setEditingExpense(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">
            💰 Mini Expense Tracker
          </h1>
          <p className="text-sm text-gray-500">Track your daily spending</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <ExpenseForm
          onSubmit={editingExpense ?
            (data) => updateExpense(editingExpense.id, data) :
            addExpense}
          editingExpense={editingExpense}
          onCancel={handleCancelEdit}
          loading={loading}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SummaryPanel summary={summary} />
          <CategoryChart summary={summary} />
        </div>

        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        <ExpenseList
          expenses={expenses}
          loading={loading}
          onEdit={handleEdit}
          onDelete={deleteExpense}
        />
      </main>
    </div>
  );
}

export default App;