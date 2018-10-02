let currPath = __dirname.split('/');
currPath = currPath.slice(0, currPath.length - 1).join('/');

console.time('PGseed');

const { Pool, Client } = require('pg');
// const fs = require('fs');
const Promise = require('bluebird');
const readFile = Promise.promisify(require('fs').readFile);
const { alphabet } = require(`${currPath}/data/idGenerator`);

const conn = {
  user: 'jenn',
  host: 'localhost',
  database: 'robinhood',
  password: '',
  port: 5432
};

const initOptions = {
  connect(client) {
    const cp = client.connectionParameters;
    // console.log('Connected to database:', cp.database);
  }
};

const pgp = require('pg-promise')(initOptions);
const db = pgp(conn);

// function readData(tableLetter) {
//   console.time('readFile');
//   let seedPath = `${currPath}/data/seed/data${tableLetter}.json`
//   readFile(seedPath)
//     .then((data) => { return JSON.parse(data); })
//     .then((entries) => { 
//       console.timeEnd('readFile');
//       let cs = makeColSet(tableLetter.toLowerCase());
//       seedEntries(tableLetter, entries, cs);
//     })
//     .catch((err) => { console.log(err); })
// };

// function makeColSet(tableLetter) {
//   return new pgp.helpers.ColumnSet([
//     {name: 'companyabbriev', prop: 'companyAbbriev'},
//     {name: 'company'},
//     {name: 'weeks', cast: ':json[]'},
//     {name: 'yearly', mod: ':json'},
//     {name: 'currentprice', prop: 'currentPrice', cast: 'money[]'},
//   ], {table: `${tableLetter}stockprices`});
// };

// function seedData(insert) {
//   return new Promise((resolve, reject) => {
//     db.none(insert)
//       .then(() => { resolve(); })
//       .catch(error => { reject(error); })
//   });
// }

// function seedEntries(tableLetter, entries, cs) {
//     console.time('seedFile');
//     let chunkSize = 10000;
//     let currentIndex = 0;
//     let endOfFile = entries.length;

//     function chunkData(current) {
//       if (current === endOfFile) { return; } 
//       let chunk;
//       if (current + chunkSize < endOfFile) { 
//         chunk = entries.slice(current, current + chunkSize);
//       } else {
//         chunk = entries.slice(current);
//       }
//       let insert = pgp.helpers.insert(chunk, cs);
//       seedData(insert)
//         .then(() => { 
//           if (current + chunkSize >= endOfFile) {
//             chunkData(endOfFile);
//             pgp.end();
//             console.timeEnd('seedFile');
//           } else {
//             console.log(`${tableLetter} - chunk ${current}`);
//             chunkData(current+chunkSize);
//           }
//         })
//         .catch((err) => { console.log(err); })
//     }
//     chunkData(currentIndex);
//   }

// function seed() {
//   readData(alphabet[6]);
// }

// seed();

const pool = new Pool(conn);

// let letter = alphabet[11];
let letter = alphabet[22];
console.log(letter);
let file = `./data/seed/data${letter}.csv`;
pool.query(`\COPY ${letter}stockprices FROM '${file}' WITH DELIMITER AS ',' CSV HEADER`, (err, res) => {
  if (err) { console.log(err); }
  console.log(res);
  pool.end();
});


// const stockPriceTableQuery = 'CREATE TABLE stockprices( id SERIAL PRIMARY KEY, companyabbr CHAR(5) NOT NULL, company VARCHAR(40) NOT NULL, weeks JSON[] NOT NULL, currentprice NUMERIC(5,2)[] NOT NULL);';

// db.query(stockPriceTableQuery)
//   .then(res => {
//     console.log(res);
//     console.timeEnd('PGseed');
//   })
//   .catch(err => {
//     console.log(err);
//   });
    // .finally(pgp.end);


// db.connect()
//   .then(obj => {
//     sco = obj;
//     return sco.any('CREATE TABLE stockPrices(id SERIAL PRIMARY KEY, company-abbr CHAR(5) NOT NULL,company VARCHAR(40) NOT NULL)');
//     // obj.done(); // success, release the connection;
//   })
//   .catch(error => {
//     console.log('ERROR:', error.message || error);
//   })
//   .finally(() => {
//     // release the connection, if it was successful:
//     if (sco) {
//         sco.done();
//     }
//   });

// const pool = new Pool({
//   user: 'jenn',
//   host: 'localhost',
//   database: 'robinhood',
//   password: '',
//   port: 5432,
// })

// pool.query("DROP TABLE IF EXISTS stockprices", (err, res) => {
//   if (err) { console.log(err); }
//   console.log(res);
//   pool.end();
// });

// module.exports = db;