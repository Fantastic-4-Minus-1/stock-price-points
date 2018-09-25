const express = require('express');
const path = require('path');
const parser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const Company = require('../database/index.js');
const handleListen = require('./handleListen.js');
// const peoplebought = require('./router/peoplebought')

mongoose.connect(
  'mongodb://localhost/people-also-bought',
  { useNewUrlParser: true },
  err => {
    console.log(err || 'MongoDB connected');
  }
);

const app = express();
const PORT = 3003;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../public')));

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
app.get('/:company', (req, res) => {
  console.log('hit');
  Company.find({ group: getRandomIntInclusive(1, 8) }).exec((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
});

app.get('/api/people-also-bought/:company', (req, res) => {
  Company.find({ group: getRandomIntInclusive(1, 8) }).exec((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
});

// app.listen(PORT, () => {
//   console.log("Listening to port: ", PORT)
// })

app.listen(PORT, handleListen(console.log, PORT));


// const express = require('express');
// const path = require('path');
// const parser = require('body-parser');
// const logger = require('morgan');
// const mongoose = require('mongoose');
// const Company = require('../database/index.js');
// const handleListen = require('./handleListen.js');
// // const peoplebought = require('./router/peoplebought')

// mongoose.connect('mongodb://localhost/people-also-bought', { useNewUrlParser: true }, (err) => {
//   console.log(err || 'MongoDB connected');
// });

// const app = express();
// const PORT = 3003;

// app.use(parser.json());
// app.use(parser.urlencoded({ extended: true }));
// app.use(logger('dev'));
// app.use(express.static(path.join(__dirname, '../public')));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// function getRandomIntInclusive(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// // app.get('/api/people-also-bought', (req, res) => {
// //   Company.find({ group: getRandomIntInclusive(1, 8) }).exec((err, results) => {
// //     if (err) {
// //       res.send(err);
// //     } else {
// //       res.json(results);
// //     }
// //   });
// // });


// app.get('/api/people-also-bought/:company', (req, res) => {
//   const { company } = req.params;
//   Company.find({ company }, null, (err, result) => {
//     if (err) {
//       console.log('find company error');
//     } else {
//       let group = result[0].group;
//       console.log('this is groups', group);
//       if (group === 8) {
//         group = 1;
//       } else {
//         group += 1;
//       }
//       Company.find({ group }, null, (error, response) => {
//         if (error) {
//           res.status('302').send(error);
//         } else {
//           console.log(response)
//           res.json(response);
//         }
//       });
//     }
//   });
// });

// app.listen(PORT, handleListen(console.log, PORT));
