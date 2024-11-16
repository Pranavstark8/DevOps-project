const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 5002;

// NewsAPI Configuration
const NEWS_API_KEY = '174a3b6c7519488682e541a84f8c0ee8'; // Replace with your actual NewsAPI key
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;

app.use(cors());

// Existing Services Endpoint
app.get('/api/services', (req, res) => {
    res.json({
        services: [
            { name: "Frontend Service", url: "http://localhost:3000" },
            { name: "Auth Service", url: "http://localhost:5001" },
            { name: "API Service", url: "http://localhost:5002" }
        ]
    }).status(200);
});

// New Endpoint for Fetching News
app.get('/api/news', async (req, res) => {
    try {
        const response = await axios.get(NEWS_API_URL);
        res.json({
            status: 'success',
            articles: response.data.articles
        });
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch news'
        });
    }
});

app.listen(PORT, () => {
    console.log(`API service running on http://localhost:${PORT}`);
});
