require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const userRoutes = require('./routes/user.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Auth routes
app.use('/api/user', userRoutes);

db.connect();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
