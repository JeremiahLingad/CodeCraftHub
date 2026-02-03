const request = require('supertest');
const app = require('../config/server');
const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

let token;

beforeAll(async () => {
    // Connect to MongoDB before tests
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Create a user for testing
    const user = await User.create({ username: 'testuser', email: 'test@example.com', password: 'password123' });
    token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
    // Close the MongoDB connection after tests
    await mongoose.connection.close();
});

describe('User Management', () => {
    it('should get user profile', async () => {
        const res = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.username).toBe('testuser');
    });

    it('should update user profile', async () => {
        const res = await request(app)
            .put('/api/users/profile')
            .set('Authorization', `Bearer ${token}`)
            .send({ username: 'updateduser', email: 'updated@example.com' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.username).toBe('updateduser');
        expect(res.body.email).toBe('updated@example.com');
    });
});