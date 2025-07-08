require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');
const ticketRoutes = require('./routes/ticket.routes');

const app = express();
const PORT = 3001;

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5000'
  ],
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

connectDB();
console.log('Database connected successfully');
// Example route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// User routes
app.use('/api/user', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tickets', ticketRoutes);

// Error handling middleware for debugging
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
