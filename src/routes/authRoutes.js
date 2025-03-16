// src/routes/authRoutes.js
const express = require('express');
const { loginUser, logoutUser, registerUser } = require('../services/authService');
const authMiddleware = require('../middlewares/authMiddleware');
const AppError = require('../utils/appError');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await registerUser(name, email, password);
        res.status(201).json({ status: 'Registration success', message: 'Account has been created' });
    } catch (error) {
        const statusCode = error.statusCode;

        res.status(statusCode).json({
            status: 'Registration failed',
            message: error.message || 'Internal Server Error',
        });
    }
});

// User Login (Generate and Store Token)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token } = await loginUser(email, password);
        res.status(200).json({ token });
    } catch (error) {
        const statusCode = error.statusCode;
        if (statusCode == 500){
            res.status(statusCode).json({
                status: 'Login failed',
                message: 'Internal Server Error',
            });
        }

        res.status(statusCode).json({
            status: 'Login failed',
            message: error.message,
        });
    }
});

// User Logout (Invalidate Token)
router.post('/logout', authMiddleware, async (req, res) => {
    try {
        await logoutUser(req.user.id);
        res.json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Logout failed', error: error.message });
    }
});

module.exports = router;
