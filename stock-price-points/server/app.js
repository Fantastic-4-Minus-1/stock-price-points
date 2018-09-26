const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const { Company, mongoose } = require('../database/index.js');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/:company', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// app.get('/data/company/:company', (req, res) => {
//   const { company } = req.params;

//   database.Company.find({ company }, null, (err, result) => {
//     if (err) {
//       return console.log('CALLBACK ERROR!');
//     }
//     console.log('here: ', req.params);
//     return res.json(result);
//   });
// });

// curl -X GET http://localhost:3002/api/stockPricePoints/Hack%20Reactor
app.get('/api/stockPricePoints/:company', (req, res) => {
  let { company } = req.params;
  // database.Company.find({ _id: id }, null, (err, result) => {
  Company.find({ company }, (err, result) => {
    if (err) {
      console.error('Cannot retrieve data for company:', company);
    } else {
      return res.json(result);
    }
  });
});

// curl -X GET http://localhost:3002/api/stockPricePoints/
app.get('/api/stockPricePoints/', (req, res) => {
  Company.find({}, (err, result) => {
    if (err) {
      console.error('Cannot retrieve any data');
    } else {
      return res.json(result);
    }
  });
});

// curl -X DELETE http://localhost:3002/api/stockPricePoints/Hacky%20React
app.delete('/api/stockPricePoints/:company', (req, res) => {
  let { company } = req.params;
  Company.findOneAndDelete({ company }, (err, data) => {
    if (err) { return console.error(err); }
    else if (data === null) {
      console.error('Company not found')
    } else {
      console.log(data.company, 'deleted');
    }
  })
  res.send();
})

// curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:3002/api/stockPricePoints/
app.post('/api/stockPricePoints/', (req, res) => {
  let { company, companyAbbriev, weeks, yearly, currentPrice } = req.body;
  let newCompany = new Company({ company, companyAbbriev, weeks, yearly, currentPrice });
  Company.find({ company }, null, (err, data) => {
    if (err) { console.error(err); }
    if (data.length > 0) {
      console.log('Data for ', company, 'already exists. Use PUT to update')
    } else {
      newCompany.save((err, newCompany) => {
        if (err) { return console.error(err); } 
        console.log(newCompany.company, 'logged.');
      })
    }
  })
  res.send();
})

let sampleData = {
  "company": "Hack Reactor",
  "companyAbbriev": "HRSF",
  "weeks": [
    {
      "weekIndex": 28,
      "weekHigh": 149.1,
      "weekLow": 131.05,
      "weekAverage": 140.07,
      "weekStocksPurchased": 231
    }
  ],
  "yearly": {
    "stocksPurchasedYear": 21334,
    "yearHighest": 194.38,
    "yearLowest": 90.96,
    "yearAverage": 134.4
  },
  "currentPrice": [
    152.23,
    126.08,
    156.69,
    102.73,
    112.12,
    184.67,
    160.86,
    142.39,
    158.46,
    143.34,
    115.77,
    179.37,
    103.04,
    183.58,
    180.91,
    123.65,
    114.49,
    153.15,
    137.71,
    166.91,
    131.19,
    119.75,
    115.19,
    129.94,
    150.29,
    97.35,
    172.38,
    193.72,
    120.82,
    102.92,
    121.7,
    92.37,
    92.85,
    133.72,
    158.05,
    167.57,
    181.76,
    122.98,
    193.37,
    155.59,
    121.94,
    94.45,
    118.31,
    174.03,
    108.23,
    130.53,
    157.61,
    118.8,
    193.42,
    96.95,
    118.32,
    148.52,
    147.82,
    184.73,
    155.96,
    151.88,
    155.25,
    181.79,
    147.04,
    132.89,
    92.54,
    131.2,
    143.37,
    117.56,
    136.74,
    104.61,
    97.21,
    135.01,
    121.48,
    137.86,
    161.34,
    136.46,
    118.05,
    165.74,
    142.2,
    174.71,
    184.11,
    180.33,
    138.97,
    136.01,
    128.03,
    167.22,
    102.37,
    94.87,
    155.37,
    142.75,
    158.43,
    181.43,
    98.6,
    140.27,
    144.61,
    121.11,
    168.89,
    188.6,
    175.5,
    162.46,
    145.81,
    116.99,
    143.57,
    141.62,
    186.65,
    165.98,
    101.67,
    113.91,
    124.45,
    140.65,
    110.85,
    124.44,
    180.39,
    122.04,
    148.07,
    122.89,
    176.43,
    97.22,
    131.04,
    166.63,
    173.46,
    141.2,
    189.29,
    142.01,
    96.96,
    98.46,
    116.26,
    93.47,
    136.68,
    149.92,
    106.04,
    178.19,
    163.12,
    132.9,
    173.55,
    156.29,
    158.41,
    96.71,
    158.36,
    184.49,
    127.42,
    160.65,
    168.37,
    109.6,
    157.01,
    138.51,
    154.02,
    101.64,
    191.97,
    177.5,
    181.76,
    142.63,
    126,
    141.49,
    120,
    184.74,
    100.76,
    151.65,
    122.26,
    189.64,
    169.15,
    101.42,
    179.04,
    110.07,
    180.96,
    127.65,
    164.2,
    119.71,
    157.41,
    163.51,
    158.88,
    190.64,
    157.9,
    100.91,
    143.88,
    108.04,
    128.35,
    115.91,
    158.7,
    117.78,
    104.59,
    173.12,
    192.11,
    177.47,
    100.92,
    157.79,
    162.52,
    100.35,
    131.52,
    145.28,
    164.55,
    110.85,
    156.53,
    134.69,
    126.05,
    156.27,
    154.37,
    97.36,
    97.37,
    114.17,
    98.96,
    116.11,
    120.28,
    193.25,
    115.24,
    95.01,
    184,
    133.84,
    116.25,
    179.28,
    133.48,
    133.2,
    140.5,
    139.25,
    108.83,
    166.49,
    167.6,
    95.99,
    99.46,
    183.74,
    189.03,
    101.65,
    155.04,
    93.21,
    120.24,
    105.24,
    166.83,
    118.19,
    96.51,
    140.23,
    176.21,
    143.02,
    131.51,
    154.14,
    136.95,
    130.68,
    109.95,
    171.64,
    147.73,
    109.6,
    168.26,
    187.88,
    123.34,
    130.56
  ]
}

// curl -X PUT http://localhost:3002/api/stockPricePoints/Hack%20Reactor
app.put('/api/stockPricePoints/:company', (req, res) => {
  let { company } = req.params;
  let { companyAbbriev, weeks, yearly, currentPrice } = req.body;
  let updatedCompany = new Company({ company, companyAbbriev, weeks, yearly, currentPrice });
  Company.findOneAndUpdate({ company }, sampleData, null, (err, data) => {
    if (err) { return console.error(err); }
    else if (data === null) {
      updatedCompany.save((err, updatedCompany) => {
        if (err) { return console.error(err); } 
        console.log(updatedCompany.company, 'logged.');
      })
    } else {
      console.log(data.company, 'updated');
    }
  })
  res.send();
})

module.exports = {
  app,
};
