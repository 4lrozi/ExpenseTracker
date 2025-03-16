// src/services/expenseService.js
const Expense = require('../models/expense');
const { v4: uuidv4 } = require('uuid');

const createExpense = async (userId, amount, category, description) => {
    const expense = new Expense({
      userId,
      expenseId: uuidv4(),
      amount,
      category,
      description,
    });
    return await expense.save();
  };

// Get expenses by userId
const getExpensesByUser = async (userId) => {
    return await Expense.find({ userId }).select('-userId -date');
};

// Update an expense
const updateExpense = async (id, updateData) => {
    return await Expense.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete an expense
const deleteExpense = async (expenseId, userId) => {
    const expense = await Expense.findOne({ expenseId, userId });
    if (!expense) throw new Error('Expense not found or unauthorized');

    await Expense.deleteOne({ expenseId });
};

module.exports = {
    createExpense,
    getExpensesByUser,
    updateExpense,
    deleteExpense,
};