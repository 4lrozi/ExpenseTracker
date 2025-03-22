// src/app.js
const express = require('express');
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorMiddleware')

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

// Database connection
connectDB();

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);

// Health check route
app.get('/api/health', (req, res) => res.status(200).send('✅ Service is healthy'));

// Global error handler
app.use(errorHandler);

module.exports = app;
