const express = require('express');
const dotenv = require('dotenv');
const products = require('./data/products');
const connectDb = require('./config/db');

dotenv.config();

connectDb();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/plants', (req, res) => {
  res.json(products);
});

app.get('/api/plants/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('tudo bem'));
