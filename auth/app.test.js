const request = require('supertest');
const express = require('express');

// Import the app (mocked for simplicity)
const app = express();
app.use(express.json());

// Simulated login and registration routes
app.post('/auth/register', (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    res.status(201).json({ message: 'User registered successfully' });
});

app.post('/auth/login', (req, res) => {
    if (req.body.username === 'testuser' && req.body.password === 'password') {
        return res.json({ success: true });
    }
    res.status(401).json({ success: false, message: 'Invalid credentials' });
});

describe('Auth Service', () => {
    it('should register a user successfully', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({ username: 'testuser', password: 'password' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'User registered successfully');
    });

    it('should return error for missing fields during registration', async () => {
        const res = await request(app).post('/auth/register').send({});
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('message', 'Missing required fields');
    });

    it('should login successfully with correct credentials', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'testuser', password: 'password' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success', true);
    });

    it('should fail login with incorrect credentials', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'testuser', password: 'wrongpassword' });
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('success', false);
    });
});
