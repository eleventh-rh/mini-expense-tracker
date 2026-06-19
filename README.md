# Mini Expense Tracker

A full-stack expense tracking web application built with React and Node.js/Express.
Users can log daily expenses across categories, view monthly summaries, visualize
spending with charts, filter by category and date range, and export data as CSV.

## Live Demo
- **Frontend:** https://mini-expense-tracker-bay.vercel.app
- **Backend API:** https://mini-expense-tracker-api-o0te.onrender.com

## Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS, Recharts
- **Backend:** Node.js, Express
- **Storage:** JSON file (file-based persistence)
- **Deployment:** Vercel (frontend), Render (backend)

## How to Run Locally

### Prerequisites
- Node.js installed

### Backend
```bash
cd server
npm install
node index.js
```
Server runs on http://localhost:5000

### Frontend
```bash
cd client
npm install
npm run dev
```
App runs on http://localhost:5173

## API Documentation

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | /api/expenses | Get all expenses | Query: category, from, to |
| POST | /api/expenses | Add new expense | { amount, category, date, note } |
| PUT | /api/expenses/:id | Update expense | { amount, category, date, note } |
| DELETE | /api/expenses/:id | Delete expense | — |
| GET | /api/expenses/summary | Get monthly summary | — |
| GET | /api/health | Health check | — |

## Project Structure
mini-expense-tracker/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # UI components
│       ├── hooks/          # useExpenses custom hook
│       └── utils/          # Currency formatting helpers
└── server/                 # Node.js backend
├── routes/             # Express route handlers
├── middleware/         # Validation middleware
└── data/               # JSON data storage

## Features
- Add, edit, delete expenses with confirmation
- Filter by category and date range
- Monthly summary with total, per-category breakdown
- Interactive pie chart (Recharts)
- CSV export of visible expenses
- Overdue expense highlighting
- Empty state UI
- Loading states on all API calls
- Form validation (no negatives, no future dates)
- Persistent storage via JSON file

## Next Steps
- Add user authentication
- Support multiple currencies
- Add budget limits per category with alerts
- Recurring expense support
- Dark mode

## Notes
- AI tools (Claude) were used to assist development.
  All code was reviewed and understood before submission.
- Free Render instance may take ~50 seconds to wake
  up after inactivity.
