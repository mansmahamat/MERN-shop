const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

connectDb();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/plants', productRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('tudo bem'));
