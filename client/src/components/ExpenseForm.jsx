import { useState, useEffect } from 'react';
import { getToday } from '../utils/currency';

const CATEGORIES = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

const ExpenseForm = ({ onSubmit, editingExpense, onCancel, loading }) => {
  const [form, setForm] = useState({
    amount: '', category: 'Food', date: getToday(), note: ''
  });
  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (editingExpense) {
      setForm({
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date,
        note: editingExpense.note || '',
      });
    } else {
      setForm({ amount: '', category: 'Food', date: getToday(), note: '' });
    }
    setErrors({});
  }, [editingExpense]);

  const validate = () => {
    const newErrors = {};
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      newErrors.amount = 'Enter a valid positive amount';
    if (!form.category)
      newErrors.category = 'Category is required';
    if (!form.date)
      newErrors.date = 'Date is required';
    if (form.date > getToday())
      newErrors.date = 'Date cannot be in the future';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await onSubmit({ ...form, amount: Number(form.amount) });
      setForm({ amount: '', category: 'Food', date: getToday(), note: '' });
      setErrors({});
    } catch (err) {
      setErrors({ submit: err.message });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {editingExpense ? '✏️ Edit Expense' : '➕ Add Expense'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Amount */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Amount (₹) *
            </label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className={`w-full border rounded-lg px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-400
                ${errors.amount ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.amount && (
              <p className="text-xs text-red-500 mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2
                         text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Date *</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              max={getToday()}
              className={`w-full border rounded-lg px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-400
                ${errors.date ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.date && (
              <p className="text-xs text-red-500 mt-1">{errors.date}</p>
            )}
          </div>

          {/* Note */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Note (optional)
            </label>
            <input
              type="text"
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="e.g. Lunch at café"
              className="w-full border border-gray-300 rounded-lg px-3 py-2
                         text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        {errors.submit && (
          <p className="text-sm text-red-500 mt-3">{errors.submit}</p>
        )}

        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium
                       rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
            {loading ? 'Saving...' : editingExpense ? 'Update' : 'Add Expense'}
          </button>
          {editingExpense && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 bg-gray-100 text-gray-600 text-sm font-medium
                         rounded-lg hover:bg-gray-200 transition">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;