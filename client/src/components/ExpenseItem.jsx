import { formatCurrency } from '../utils/currency';

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  const isOverdue = new Date(expense.date) < new Date(new Date().toDateString());

  const handleDelete = () => {
    if (window.confirm(`Delete "${expense.category}" expense of ${formatCurrency(expense.amount)}?`)) {
      onDelete(expense.id);
    }
  };

  return (
    <div className={`bg-white rounded-lg border p-4 flex items-center 
                     justify-between gap-4 hover:shadow-sm transition
                     ${isOverdue ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-gray-800">
            {formatCurrency(expense.amount)}
          </span>
          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 
                           text-xs rounded-full font-medium">
            {expense.category}
          </span>
          {isOverdue && (
            <span className="px-2 py-0.5 bg-red-100 text-red-600 
                             text-xs rounded-full font-medium">
              Overdue
            </span>
          )}
        </div>
        {expense.note && (
          <p className="text-sm text-gray-500 mt-1 truncate">{expense.note}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">{expense.date}</p>
      </div>
      <div className="flex gap-2 shrink-0">
        <button onClick={() => onEdit(expense)}
          className="px-3 py-1.5 text-xs bg-indigo-50 text-indigo-600 
                     rounded-lg hover:bg-indigo-100 transition font-medium">
          Edit
        </button>
        <button onClick={handleDelete}
          className="px-3 py-1.5 text-xs bg-red-50 text-red-500 
                     rounded-lg hover:bg-red-100 transition font-medium">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;