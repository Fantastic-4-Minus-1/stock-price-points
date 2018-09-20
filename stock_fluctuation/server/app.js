const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('../routes');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/stocks',
  { useNewUrlParser: true },
  err => {
    console.log(err || `MongoDB connected`);
  }
);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api', routes);


module.exports = {
  app,
  mongoose,
};
