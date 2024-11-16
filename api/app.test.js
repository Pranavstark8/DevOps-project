const request = require('supertest');
const express = require('express');
const axios = require('axios');
jest.mock('axios'); // Mock Axios for testing

// Mock app
const app = express();
app.use(express.json());

// Simulated routes
app.get('/api/services', (req, res) => {
    res.json({
        services: [
            { name: "Frontend Service", url: "http://localhost:3000" },
            { name: "Auth Service", url: "http://localhost:5001" },
            { name: "API Service", url: "http://localhost:5002" }
        ]
    });
});

app.get('/api/news', async (req, res) => {
    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines');
        res.json({
            status: 'success',
            articles: response.data.articles
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch news'
        });
    }
});

describe('API Service', () => {
    it('should return a list of services', async () => {
        const res = await request(app).get('/api/services');
        expect(res.statusCode).toBe(200);
        expect(res.body.services.length).toBeGreaterThan(0);
        expect(res.body.services[0]).toHaveProperty('name');
    });

    it('should fetch news successfully', async () => {
        axios.get.mockResolvedValue({
            data: {
                articles: [
                    { title: 'Test News 1', description: 'Description 1' },
                    { title: 'Test News 2', description: 'Description 2' }
                ]
            }
        });

        const res = await request(app).get('/api/news');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'success');
        expect(res.body.articles.length).toBeGreaterThan(0);
    });

    it('should handle news fetch errors', async () => {
        axios.get.mockRejectedValue(new Error('News API error'));

        const res = await request(app).get('/api/news');
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body).toHaveProperty('message', 'Failed to fetch news');
    });
});
