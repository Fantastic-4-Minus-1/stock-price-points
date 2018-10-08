require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const logger = require('morgan');

const app = express();
const router = require('./routes');

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(logger('dev'));

app.use('/:company', express.static('public'));
// app.get('/:company', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });

app.use('/api', router);

// CRUD API

// curl -X GET http://localhost:3002/api/stockPricePoints/AAAAA
// curl -X GET http://localhost:3002/api/stockPricePoints/
// curl -d'{"company":"Analytics Enron","companyAbbriev":"ZZZZZ","weeks":[{"weekIndex":30,"weekAverage":368.96,"weekStocksPurchased":1286},{"weekIndex":29,"weekAverage":361.85,"weekStocksPurchased":1094},{"weekIndex":28,"weekAverage":354,"weekStocksPurchased":1538},{"weekIndex":27,"weekAverage":345.38,"weekStocksPurchased":1185},{"weekIndex":26,"weekAverage":338.23,"weekStocksPurchased":1334},{"weekIndex":25,"weekAverage":329.44,"weekStocksPurchased":1220},{"weekIndex":24,"weekAverage":321.6,"weekStocksPurchased":1310},{"weekIndex":23,"weekAverage":313.97,"weekStocksPurchased":841},{"weekIndex":22,"weekAverage":306.06,"weekStocksPurchased":1400},{"weekIndex":21,"weekAverage":297.82,"weekStocksPurchased":1327},{"weekIndex":20,"weekAverage":290.8,"weekStocksPurchased":1394},{"weekIndex":19,"weekAverage":282.29,"weekStocksPurchased":1523},{"weekIndex":18,"weekAverage":274.74,"weekStocksPurchased":1839},{"weekIndex":17,"weekAverage":266.85,"weekStocksPurchased":2214},{"weekIndex":16,"weekAverage":258.52,"weekStocksPurchased":2732},{"weekIndex":15,"weekAverage":250.94,"weekStocksPurchased":2550},{"weekIndex":14,"weekAverage":242.72,"weekStocksPurchased":2007},{"weekIndex":13,"weekAverage":234.82,"weekStocksPurchased":1665},{"weekIndex":12,"weekAverage":226.83,"weekStocksPurchased":2099},{"weekIndex":11,"weekAverage":219.21,"weekStocksPurchased":2015},{"weekIndex":10,"weekAverage":211.7,"weekStocksPurchased":1577},{"weekIndex":9,"weekAverage":203.5,"weekStocksPurchased":1295},{"weekIndex":8,"weekAverage":195.97,"weekStocksPurchased":1841},{"weekIndex":7,"weekAverage":188.06,"weekStocksPurchased":1664},{"weekIndex":6,"weekAverage":179.62,"weekStocksPurchased":1618},{"weekIndex":5,"weekAverage":171.45,"weekStocksPurchased":1186},{"weekIndex":4,"weekAverage":163.72,"weekStocksPurchased":939},{"weekIndex":3,"weekAverage":155.84,"weekStocksPurchased":972},{"weekIndex":2,"weekAverage":147.83,"weekStocksPurchased":993},{"weekIndex":1,"weekAverage":139.86,"weekStocksPurchased":585}],"yearly":{"stocksPurchasedYear":45243,"yearHighest":368.96,"yearLowest":139.86,"yearAverage":255.48},"currentPrice":[265.47]}' -H "Content-Type: application/json" -X POST http://localhost:3002/api/stockPricePoints/
// curl -d'{"company":"Analytics Poop","companyAbbriev":"ZZZZZ","weeks":[{"weekIndex":30,"weekAverage":0,"weekStocksPurchased":1286},{"weekIndex":29,"weekAverage":0,"weekStocksPurchased":1094},{"weekIndex":28,"weekAverage":0,"weekStocksPurchased":1538},{"weekIndex":27,"weekAverage":0,"weekStocksPurchased":1185},{"weekIndex":26,"weekAverage":0,"weekStocksPurchased":1334},{"weekIndex":25,"weekAverage":329.44,"weekStocksPurchased":1220},{"weekIndex":24,"weekAverage":0,"weekStocksPurchased":1310},{"weekIndex":23,"weekAverage":313.97,"weekStocksPurchased":841},{"weekIndex":22,"weekAverage":306.06,"weekStocksPurchased":1400},{"weekIndex":21,"weekAverage":297.82,"weekStocksPurchased":1327},{"weekIndex":20,"weekAverage":290.8,"weekStocksPurchased":1394},{"weekIndex":19,"weekAverage":282.29,"weekStocksPurchased":1523},{"weekIndex":18,"weekAverage":274.74,"weekStocksPurchased":1839},{"weekIndex":17,"weekAverage":266.85,"weekStocksPurchased":2214},{"weekIndex":16,"weekAverage":258.52,"weekStocksPurchased":2732},{"weekIndex":15,"weekAverage":250.94,"weekStocksPurchased":2550},{"weekIndex":14,"weekAverage":242.72,"weekStocksPurchased":2007},{"weekIndex":13,"weekAverage":234.82,"weekStocksPurchased":1665},{"weekIndex":12,"weekAverage":226.83,"weekStocksPurchased":2099},{"weekIndex":11,"weekAverage":219.21,"weekStocksPurchased":2015},{"weekIndex":10,"weekAverage":211.7,"weekStocksPurchased":1577},{"weekIndex":9,"weekAverage":203.5,"weekStocksPurchased":1295},{"weekIndex":8,"weekAverage":195.97,"weekStocksPurchased":1841},{"weekIndex":7,"weekAverage":188.06,"weekStocksPurchased":1664},{"weekIndex":6,"weekAverage":179.62,"weekStocksPurchased":1618},{"weekIndex":5,"weekAverage":171.45,"weekStocksPurchased":1186},{"weekIndex":4,"weekAverage":163.72,"weekStocksPurchased":939},{"weekIndex":3,"weekAverage":155.84,"weekStocksPurchased":972},{"weekIndex":2,"weekAverage":147.83,"weekStocksPurchased":993},{"weekIndex":1,"weekAverage":139.86,"weekStocksPurchased":585}],"yearly":{"stocksPurchasedYear":45243,"yearHighest":0,"yearLowest":139.86,"yearAverage":255.48},"currentPrice":[265.47]}' -H "Content-Type: application/json" -X PUT http://localhost:3002/api/stockPricePoints/ZZZZZ
// curl -X DELETE http://localhost:3002/api/stockPricePoints/ZZZZZ

module.exports = app;
