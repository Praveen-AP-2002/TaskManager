const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config();

// Initialize Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Import routes
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).send('API is running');
});

// Construct MongoDB URI
const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const clusterUrl = process.env.MONGO_CLUSTER_URL;
const dbName = process.env.MONGO_DB_NAME;

const mongoURI = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas', err);
  });

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
