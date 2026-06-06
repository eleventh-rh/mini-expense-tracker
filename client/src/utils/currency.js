// Formats a number as Indian Rupees e.g. 1234.5 → ₹1,234.50
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };
  
  // Returns the first day of current month as YYYY-MM-DD
  export const getMonthStart = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString().split('T')[0];
  };
  
  // Returns today's date as YYYY-MM-DD
  export const getToday = () => {
    return new Date().toISOString().split('T')[0];
  };