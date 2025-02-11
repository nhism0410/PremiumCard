const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/items'); // Ensure the path is correct

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use('/api/items', itemRoutes); 

// MongoDB connection
mongoose
  .connect('mongodb+srv://marketplacex:20032025@blockchain.ho4jz.mongodb.net/BlockChain?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Example route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
