const express = require('express');
const connectDB = require('./config/db');
const { PORT } = require('./config/env');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); // Parses incoming JSON requests

// Add this in app.js
app.get('/', (req, res) => {
    res.send('<h1>User Management Service is Online</h1><p>Use /api/auth to register or login.</p>');
});
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Error handling middleware 
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});