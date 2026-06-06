import ExpenseItem from './ExpenseItem';
import EmptyState from './EmptyState';

// Converts expenses array to downloadable CSV file
const exportToCSV = (expenses) => {
  const headers = ['Date', 'Category', 'Amount', 'Note'];
  const rows = expenses.map(e => [
    e.date, e.category, e.amount, e.note || ''
  ]);
  const csvContent = [headers, ...rows]
    .map(row => row.join(','))
    .join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'expenses.csv';
  a.click();
  URL.revokeObjectURL(url);
};

const ExpenseList = ({ expenses, loading, onEdit, onDelete }) => {
  if (loading) return (
    <div className="space-y-3">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white rounded-lg border border-gray-200
                                p-4 animate-pulse h-16" />
      ))}
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">🧾 Expenses</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            {expenses.length} {expenses.length === 1 ? 'entry' : 'entries'}
          </span>
          {expenses.length > 0 && (
            <button
              onClick={() => exportToCSV(expenses)}
              className="px-3 py-1.5 text-xs bg-green-50 text-green-600
                         rounded-lg hover:bg-green-100 transition font-medium">
              ⬇ Export CSV
            </button>
          )}
        </div>
      </div>

      {expenses.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {expenses.map(expense => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;