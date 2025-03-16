// src/services/authService.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const AppError = require('../utils/appError');

const registerUser = async (name, email, password) => {
    // Check if email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new AppError('Email account is already in use', 400);
    return await User.create({ name, email, password });
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new AppError('User not found', 401);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError('Invalid credentials', 401);

    // Generate a new JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Save the new token in the database (invalidate previous token)
    user.token = token;
    await user.save();

    return { token };
};

const logoutUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    user.token = null; // Clear the token
    await user.save();
};

module.exports = { registerUser, loginUser, logoutUser };
