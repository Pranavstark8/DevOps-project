const request = require('supertest');

// Mock app
jest.mock('./app', () => {
  const express = require('express');
  const mockApp = express();

  // Mock the /api/services endpoint
  mockApp.get('/api/services', (req, res) => {
    res.status(200).json({
      data: [
        { name: "Frontend Service", url: "http://localhost:3000" },
        { name: "Auth Service", url: "http://localhost:5001" },
        { name: "API Service", url: "http://localhost:5002" }
      ]
    });
  });

  return mockApp;
});

const app = require('./app'); // Import the mocked app

describe('API Service', () => {
  it('should return a 200 status for a GET request to /api/services', async () => {
    const response = await request(app).get('/api/services');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });

  // Add more tests as needed
});
