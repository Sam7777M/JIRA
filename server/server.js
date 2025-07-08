require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');
const ticketRoutes = require('./routes/ticket.routes');

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
app.use('/api/projects', projectRoutes);
app.use('/api/tickets', ticketRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
