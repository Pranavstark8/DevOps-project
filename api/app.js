// api/app.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5002;

app.use(cors());

app.get('/api/services', (req, res) => {
    res.json({
        services: [
            { name: "Frontend Service", url: "http://localhost:3000" },
            { name: "Auth Service", url: "http://localhost:5001" },
            { name: "API Service", url: "http://localhost:5002" }
        ]
    });
});

app.listen(PORT, () => {
    console.log(`API service running on http://localhost:${PORT}`);
});
