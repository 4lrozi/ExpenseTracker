// src/models/expense.js
const mongoose = require('mongoose');

// Define the schema
const expenseSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    expenseId: {
        type: String,
        unique: true,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { toJSON: {
    transform: function (doc, ret) {
        delete ret._id;  // Remove _id
        delete ret.__v;  // Remove __v
    }
}
});

// Create and export model
const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
