// auth/app.js
const express = require('express');
const cors = require('cors'); // Add this line
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const app = express();
const PORT = 5001;

// Enable CORS for all routes, allowing requests from the frontend origin
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// MongoDB connection
// mongoose.connect('mongodb://mongodb:27017/auth-service', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('MongoDB connection error:', err));

// Register and login routes
app.post('/auth/register', async (req, res) => { /* registration code */ });
app.post('/auth/login', async (req, res) => { res.json({ success: true }) });

app.listen(PORT, () => {
    console.log(`Auth service running on http://localhost:${PORT}`);
});
