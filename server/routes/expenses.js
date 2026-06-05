const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { validateExpense } = require('../middleware/validate');

const router = express.Router();

// Path to our JSON data file
const DATA_FILE = path.join(__dirname, '../data/expenses.json');

// Helper: read all expenses from JSON file
const readExpenses = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Helper: save expenses array back to JSON file
const writeExpenses = (expenses) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2));
};

// GET /api/expenses - fetch all with optional filters
router.get('/', (req, res) => {
  try {
    let expenses = readExpenses();
    const { category, from, to } = req.query;

    if (category && category !== 'All') {
      expenses = expenses.filter(e => e.category === category);
    }
    if (from) {
      expenses = expenses.filter(e => new Date(e.date) >= new Date(from));
    }
    if (to) {
      expenses = expenses.filter(e => new Date(e.date) <= new Date(to));
    }

    // Sort newest first
    expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// GET /api/expenses/summary - totals for summary panel
router.get('/summary', (req, res) => {
  try {
    const expenses = readExpenses();
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const thisMonth = expenses.filter(e => {
      const d = new Date(e.date);
      return d.getMonth() === currentMonth &&
             d.getFullYear() === currentYear;
    });

    const totalThisMonth = thisMonth.reduce((sum, e) => sum + e.amount, 0);

    const byCategory = {};
    thisMonth.forEach(e => {
      byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
    });

    const highest = expenses.length > 0
      ? expenses.reduce((max, e) => e.amount > max.amount ? e : max)
      : null;

    res.json({ totalThisMonth, byCategory, highest });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

// POST /api/expenses - add a new expense
router.post('/', validateExpense, (req, res) => {
  try {
    const expenses = readExpenses();
    const newExpense = {
      id: uuidv4(),
      amount: req.body.amount,
      category: req.body.category,
      date: req.body.date,
      note: req.body.note || '',
      createdAt: new Date().toISOString()
    };
    expenses.push(newExpense);
    writeExpenses(expenses);
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create expense' });
  }
});

// PUT /api/expenses/:id - edit an existing expense
router.put('/:id', validateExpense, (req, res) => {
  try {
    const expenses = readExpenses();
    const index = expenses.findIndex(e => e.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    expenses[index] = {
      ...expenses[index],
      amount: req.body.amount,
      category: req.body.category,
      date: req.body.date,
      note: req.body.note || ''
    };
    writeExpenses(expenses);
    res.json(expenses[index]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

// DELETE /api/expenses/:id - remove an expense
router.delete('/:id', (req, res) => {
  try {
    const expenses = readExpenses();
    const index = expenses.findIndex(e => e.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    expenses.splice(index, 1);
    writeExpenses(expenses);
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

module.exports = router;