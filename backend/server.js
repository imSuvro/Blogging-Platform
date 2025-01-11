// backend/server.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan'); // For logging

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true,
}));
app.use(morgan('dev')); // Logging middleware

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

// Handle undefined Routes
app.use((req, res) => {
    res.status(404).json({ msg: 'Route not found' });
});

// Define PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
