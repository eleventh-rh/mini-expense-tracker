const EmptyState = () => {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
        <p className="text-5xl mb-4">📭</p>
        <h3 className="text-lg font-semibold text-gray-700">No expenses found</h3>
        <p className="text-gray-400 mt-1">Add your first expense using the form above</p>
      </div>
    );
  };
  
  export default EmptyState;