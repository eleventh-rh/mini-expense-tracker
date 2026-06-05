const express = require('express');
const cors = require('cors');
const expensesRouter = require('./routes/expenses');

const app = express();
const PORT = process.env.PORT || 5000;

// Allow frontend to communicate with this backend
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// All expense-related routes handled here
app.use('/api/expenses', expensesRouter);

// Health check - confirms server is alive
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Expense Tracker API is running' });
});

// Start listening for requests
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});