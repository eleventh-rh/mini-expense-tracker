// Validates incoming expense data before it reaches the route handler
const validateExpense = (req, res, next) => {
    const { amount, category, date } = req.body;
  
    // Amount must exist and be a positive number
    if (amount === undefined || amount === null) {
      return res.status(400).json({ error: 'Amount is required' });
    }
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'Amount must be a positive number' });
    }
  
    // Category is required
    if (!category || category.trim() === '') {
      return res.status(400).json({ error: 'Category is required' });
    }
  
    // Date is required and cannot be in the future
    if (!date) {
      return res.status(400).json({ error: 'Date is required' });
    }
    if (new Date(date) > new Date()) {
      return res.status(400).json({ error: 'Date cannot be in the future' });
    }
  
    // All checks passed - move to next handler
    next();
  };
  
  module.exports = { validateExpense };