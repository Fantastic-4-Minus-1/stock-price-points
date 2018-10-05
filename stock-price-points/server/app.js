const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');

const app = express();
const router = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/:company', express.static('public'));

app.use('/api', router);

// app.get('/:company', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });

// CRUD API

// curl -X GET http://localhost:3002/api/stockPricePoints/Hack%20Reactor
// curl -X GET http://localhost:3002/api/stockPricePoints/
// curl -X DELETE http://localhost:3002/api/stockPricePoints/Hack%20Reactor
// curl -d '{"company": "Hack Reactor","companyAbbriev": "HRSF","weeks": [{"weekIndex": 30,"weekHigh": 170.74,"weekLow": 125.83,"weekAverage": 148.28,"weekStocksPurchased": 95}],"yearly": {"stocksPurchasedYear": 21334,"yearHighest": 194.38,"yearLowest": 90.96,"yearAverage": 134.4},"currentPrice": [130.56]}' -H "Content-Type: application/json" -X POST http://localhost:3002/api/stockPricePoints/
// curl -d '{"company": "Hack Reactor","companyAbbriev": "HRSF","weeks": [{"weekIndex": 0,"weekHigh": 0,"weekLow": 0,"weekAverage": 0,"weekStocksPurchased": 0}],"yearly": {"stocksPurchasedYear": 21334,"yearHighest": 194.38,"yearLowest": 90.96,"yearAverage": 134.4},"currentPrice": [130.56]}' -H "Content-Type: application/json" -X PUT http://localhost:3002/api/stockPricePoints/Hack%20Reactor

module.exports = app;
