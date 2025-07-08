require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');
const ticketRoutes = require('./routes/ticket.routes');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

connectDB();
console.log('Database connected successfully');
// Example route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Auth routes
app.use('/api/user', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tickets', ticketRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
