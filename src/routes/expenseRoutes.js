// src/routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const { addExpense, getUserExpenses, deleteExpense } = require('../controllers/expenseController');
const authMiddleware = require('../middlewares/authMiddleware');

// ✅ Create an expense
router.post('/', authMiddleware, addExpense);
router.get('/', authMiddleware, getUserExpenses);
router.delete('/:expenseId', authMiddleware, deleteExpense);

module.exports = router;
