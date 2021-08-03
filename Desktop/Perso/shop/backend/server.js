const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');

const productRoutes = require('./routes/productRoutes');

dotenv.config();

connectDb();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/plants', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('tudo bem'));
