const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

mongoose.connect('mongodb://localhost:27017/login-signup', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
