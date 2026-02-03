const express = require('express');
const connectDB = require('./db');

const app = express();
connectDB();

// Middleware
app.use(express.json()); // for parsing application/json

// Routes
app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/users', require('../routes/userRoutes'));

module.exports = app;