require('dotenv').config();
const express = require('express');

const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

// Connect to database


connectDB();

// Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define routes
app.use('/api/users', require('./routes/auth'));
app.use('/api/subscriptions', require('./routes/subscriptions'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
