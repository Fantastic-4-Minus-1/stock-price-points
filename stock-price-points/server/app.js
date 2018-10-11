// require('newrelic');
const redis = require('redis');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');

const app = express();
const router = require('./routes');

const client = redis.createClient(6379, 'ec2-54-153-88-58.us-west-1.compute.amazonaws.com');

client.on('error', function (err) {
  console.log('Error ' + err);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use('/:company', express.static('public'));

app.use('/api', router);

module.exports = app;
