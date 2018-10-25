// require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');

const app = express();
const router = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use('/:company', express.static('public'));

app.use('/api', router);

module.exports = app;
