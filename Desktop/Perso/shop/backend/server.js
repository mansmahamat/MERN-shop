const express = require('express');
const products = require('./data/products');

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

app.listen(5000, console.log('tudo bem'));