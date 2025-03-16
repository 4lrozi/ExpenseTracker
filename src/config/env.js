require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.EXPENSE_DB_URI ,
    jwtSecret: process.env.JWT_SECRET,
    // environment: process.env.NODE_ENV || 'development',
};