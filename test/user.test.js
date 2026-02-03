const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

let token;
exports.token = token;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    // Create a user for testing
    const user = await User.create({ username: 'testuser', email: 'test@example.com', password: 'password123' });
    token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
    await mongoose.connection.close();
});

