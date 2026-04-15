
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

// config
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// test route
app.get('/', (req, res) => {
  res.send(' Server is  Running Fine!');
});

// sample API route
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API working perfectly'
  });
});

// start server
app.listen(port, () => {
  console.log(` Server is  running on port ${port}`);
});