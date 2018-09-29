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
    console.log('Connected to database:', cp.database);
  }
};

const pgp = require('pg-promise')(initOptions);
const db = pgp(conn);

// function readDataFile(tableLetter, callback) {
//   let seedPath = `${currPath}/data/seed/data${tableLetter}.json`
//   fs.readFile(seedPath, (err, data) => {
//     if (err) { callback(err); }
//     callback(null, JSON.parse(data)[0]);
//     // seedEntry(JSON.parse(data));
//   })
// }

// readDataFile(alphabet[0], (err, data) => {
//   console.log(data);
//   console.timeEnd('PGseed');
// });

// bluebird promises
function readData(tableLetter) {
  console.time('readFile');
  let seedPath = `${currPath}/data/seed/data${tableLetter}.json`
  readFile(seedPath)
    .then((data) => { return JSON.parse(data); })
    .then((entries) => { 
      console.timeEnd('readFile');
      let cs = makeColSet(tableLetter.toLowerCase());
      seedEntries(tableLetter, entries, cs);
    })
    .catch((err) => { console.log(err); })
};

function makeColSet(tableLetter) {
  return new pgp.helpers.ColumnSet([
    {name: 'companyabbriev', prop: 'companyAbbriev'},
    {name: 'company'},
    {name: 'weeks', cast: ':json[]'},
    {name: 'yearly', mod: ':json'},
    {name: 'currentprice', prop: 'currentPrice', cast: 'money[]'},
  ], {table: `${tableLetter}stockprices`});
};

// function seedEntries(tableLetter, entries, cs) {
//   console.time('seedFile');
//   let insert = pgp.helpers.insert(entries, cs);
//   db.none(insert)
//     .then(() => {
//       console.log(`Entries for ${tableLetter} seeded`);
//       console.timeEnd('seedFile');
//       console.timeEnd('PGseed');
//     })
//     .catch(error => {
//       console.log('Seeding error: ', error);
//     })
//     .finally(pgp.end);
// }

function seedEntries(tableLetter, entries, cs) {
    console.time('seedFile');
    
    let chunkSize = 2;
    let currentIndex = 0;

    function chunkData(current) {
      if (current + chunkSize > entries.length) { 
        console.log('End of data');
        return;
      }
      let chunk = entries.slice(current, current + chunkSize);
      console.log(chunk);
      let insert = pgp.helpers.insert(chunk, cs);
      seedData(insert)
        .then(() => { 
          console.log('seeded 5');
          chunkData(current + chunkSize);
        })
        .catch(() => { console.log('error seeding'); })

    }

    chunkData(currentIndex);
    
  }

function seedData(insert) {
  
  return new Promise((resolve, reject) => {
    db.none(insert)
      .then(() => {
        console.log(`Entries for ${tableLetter} seeded`);
        console.timeEnd('seedFile');
        console.timeEnd('PGseed');
        resolve();
      })
      .catch(error => {
        reject(error);
      })
  });
}

readData(alphabet[22]);

// const stockPriceTableQuery = 'CREATE TABLE stockprices( id SERIAL PRIMARY KEY, companyabbr CHAR(5) NOT NULL, company VARCHAR(40) NOT NULL, weeks JSON[] NOT NULL, currentprice NUMERIC(5,2)[] NOT NULL);';

// db.query(stockPriceTableQuery)
//   .then(res => {
//     console.log(res);
//     console.timeEnd('PGseed');
//   })
//   .catch(err => {
//     console.log(err);
//   });

// // function getNextData(t, pageIndex) {
// //   // t = database transaction protocol, if you need to execute queries

// //   // 1. returns a promise that represents the next data that will be available
// //   // 2. retrieves the next data batch (array of objects), either sequentially or
// //   //    according to the pageIndex, and resolves with that array of objects.
// //   // 3. when no more data left, it must resolve with null
// // }

// // db.tx('massive-insert', t => {
// //   return t.sequence(index => {
// //       return getNextData(t, index)
// //           .then(data => {
// //               if (data) {
// //                   const insert = pgp.helpers.insert(data, cs);
// //                   return t.none(insert);
// //               }
// //           });
// //   });
// // })
// //   .then(data => {
// //       // COMMIT has been executed
// //       console.log('Total batches:', data.total, ', Duration:', data.duration);
// //   })
// //   .catch(error => {
// //       // ROLLBACK has been executed
// //       console.log(error);
// //   });
// // let sco;

// // db.connect()
// //   .then(obj => {
// //     sco = obj;
// //     return sco.any('CREATE TABLE stockPrices(id SERIAL PRIMARY KEY, company-abbr CHAR(5) NOT NULL,company VARCHAR(40) NOT NULL)');
// //     // obj.done(); // success, release the connection;
// //   })
// //   .catch(error => {
// //     console.log('ERROR:', error.message || error);
// //   })
// //   .finally(() => {
// //     // release the connection, if it was successful:
// //     if (sco) {
// //         sco.done();
// //     }
// //   });

// // const pool = new Pool({
// //   user: 'jenn',
// //   host: 'localhost',
// //   database: 'robinhood',
// //   password: '',
// //   port: 5432,
// // })

// // pool.query("DROP TABLE IF EXISTS stockprices", (err, res) => {
// //   if (err) { console.log(err); }
// //   console.log(res);
// //   pool.end();
// // });

// // const client = new Client({
// //   user: 'jenn',
// //   host: 'localhost',
// //   database: 'Jenn',
// //   password: '',
// //   port: 5432,
// // })
// // client.connect()

// // client.query('CREATE TABLE users(id SERIAL PRIMARY KEY, firstname VARCHAR(40) NOT NULL,lastName VARCHAR(40) NOT NULL', (err, res) => {
// //   console.log(err, res)
// //   client.end()
// // });

// module.exports = db;