// src/controllers/expenseController.js
const expenseService = require('../services/expenseService');

// Create a new expense
const addExpense = async (req, res) => {
    try {
        const { amount, category, description } = req.body;
        const userId = req.user.id; // Extracted from JWT

        const expense = await expenseService.createExpense( userId, amount, category, description );

        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Error creating expense', error });
    }
};

const getUserExpenses = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming userId is from JWT
        const expenses = await expenseService.getExpensesByUser(userId);
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error });
    }
};

// ➤ Delete a specific expense by expenseId
const deleteExpense = async (req, res) => {
    try {
        const { expenseId } = req.params;
        const { id: userId } = req.user;

        await expenseService.deleteExpense(expenseId, userId);
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    addExpense,
    getUserExpenses,
    deleteExpense,
};
