import ExpenseItem from './ExpenseItem';
import EmptyState from './EmptyState';

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
        <span className="text-sm text-gray-500">
          {expenses.length} {expenses.length === 1 ? 'entry' : 'entries'}
        </span>
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