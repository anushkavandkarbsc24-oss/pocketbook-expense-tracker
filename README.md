# Pocketbook - Full-Stack Expense Tracker

## 1. Project overview
Pocketbook is a MERN-style expense tracker. Users sign up, log in (JWT), add and delete income and
expenses, and see their balance, savings rate and charts on a dashboard. Each user only sees their own data.

Extra features beyond the basic requirements:
1. **Search and category filter** on the income and expense lists.
2. **CSV export** of the (filtered) list.
3. **Savings rate** and a **6-month income vs expense chart** on the dashboard.

## 2. Technologies
React 18 (Vite), JavaScript, React Router 6, Axios, Tailwind CSS 3, Recharts,
Node.js, Express.js, MongoDB, Mongoose, JWT (jsonwebtoken), bcryptjs.

## 3. Folder structure
```
expense-tracker/
├── backend/
│   ├── server.js                  entry point
│   ├── config/                    db.js (MongoDB), categories.js
│   ├── models/                    User, Income, Expense
│   ├── controllers/               auth, income, expense, dashboard, transactionController (shared)
│   ├── routes/                    authRoutes, incomeRoutes, expenseRoutes, dashboardRoutes
│   ├── middleware/                authMiddleware (JWT), errorMiddleware
│   └── .env.example
└── frontend/
    ├── index.html, vite.config.js, tailwind.config.js, postcss.config.js
    └── src/
        ├── main.jsx, App.jsx      providers + all routes
        ├── api/axios.js           Axios instance + JWT interceptor
        ├── context/AuthContext.jsx
        ├── hooks/useTransactions.js
        ├── components/            Layout, Sidebar, ProtectedRoute, StatusMessage (class),
        │                          StatCard, TransactionForm, TransactionList, charts, AuthCard
        ├── pages/                 Login, Signup, Dashboard, Income, Expenses, TransactionsPage, NotFound
        └── utils/                 constants.js, helpers.js
```

## 4. Install dependencies
Requires Node.js 18+ and npm.
```bash
cd backend  && npm install
cd ../frontend && npm install
```

## 5. Environment variables
Backend: copy `backend/.env.example` to `backend/.env` and edit:

| Variable | Meaning |
|---|---|
| `PORT` | API port (default 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | any long random string (keep private) |
| `CLIENT_URL` | frontend URL for CORS (default `http://localhost:5173`) |

Frontend (optional): copy `frontend/.env.example` to `frontend/.env` only if the API is not at `http://localhost:5000/api`.

## 6. Start the backend
```bash
cd backend
npm run dev     # auto-restarts on changes (or: npm start)
```
You should see `MongoDB connected` and `Server running on http://localhost:5000`.

## 7. Start the frontend
```bash
cd frontend
npm run dev
```
Open http://localhost:5173

## 8. MongoDB setup
Pick one:
- **Local:** install MongoDB Community Server, make sure the service is running, and use
  `MONGO_URI=mongodb://127.0.0.1:27017/expense-tracker`. Collections are created automatically.
- **Atlas (cloud, free):** create a free cluster, add a database user, allow your IP under
  Network Access, copy the connection string into `MONGO_URI` (replace `<password>`).

## 9. API endpoints
Base URL: `http://localhost:5000/api`. "Auth" means the header `Authorization: Bearer <token>` is required.

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/auth/signup` | no | Create account, returns token + user |
| POST | `/auth/login` | no | Log in, returns token + user |
| GET | `/auth/me` | yes | Current user (used to verify saved token) |
| GET | `/income` | yes | List the user's income |
| POST | `/income` | yes | Add income `{title, amount, category, date}` |
| DELETE | `/income/:id` | yes | Delete an income entry |
| GET | `/expenses` | yes | List the user's expenses |
| POST | `/expenses` | yes | Add expense `{title, amount, category, date}` |
| DELETE | `/expenses/:id` | yes | Delete an expense |
| GET | `/dashboard` | yes | Totals, balance, savings rate, chart data, recent items |
| GET | `/health` | no | Simple server check |

## 10. React concepts demonstrated
| Concept | Where |
|---|---|
| Components and architecture | `components/`, `pages/` (small reusable pieces) |
| Class component | `components/StatusMessage.jsx` (constructor, state, `componentDidUpdate`, `defaultProps`) |
| Props / parent-child communication | `Layout -> Sidebar` (open, onClose), `Income -> TransactionsPage -> TransactionForm / TransactionList` (callbacks like `onSubmit`, `onDelete`) |
| useState | forms, filters, sidebar drawer, loading/error flags |
| useEffect | `AuthContext` (verify token), `Dashboard` (fetch), `useTransactions` (fetch + cleanup) |
| useMemo | `TransactionsPage` filtering |
| Context API | `context/AuthContext.jsx` |
| Custom hooks | `useAuth`, `useTransactions` |
| Event handling and forms | `TransactionForm`, `Login`, `Signup` (controlled inputs, `onChange`, `onSubmit`, validation) |
| React Router | `App.jsx` (routes, nested layout route), `ProtectedRoute`, `NavLink`, `useNavigate`, `Navigate` |
| Responsive UI | Tailwind breakpoints: mobile drawer sidebar, stacked grids, `ResponsiveContainer` charts |
