const { Pool, Client } = require('pg');

const initOptions = {
  connect(client) {
    const cp = client.connectionParameters;
    console.log('Connected to database:', cp.database);
  }
};

const conn = {
  user: 'jenn',
  host: 'localhost',
  database: 'robinhood',
  password: '',
  port: 5432
};

const pgp = require('pg-promise')(initOptions);
const db = pgp(conn);

const companyColSet = new pgp.helpers.ColumnSet([
  {name: 'companyabbriev'},
  {name: 'company'},
  {name: 'stockspurchased'},
  {name: 'yearhigh'},
  {name: 'yearlow'},
  {name: 'yearavg'},
  {name: 'currentprice'}
  ], {table: `stockprices`});

const distributionColSet = new pgp.helpers.ColumnSet([
  {name: 'id'},
  {name: 'divindex'},
  {name: 'divaverage'},
  {name: 'divstockspurchased'}
  ], {table: 'stockdistribution'});

function getCompany(companyAbbriev, callback) {
  let queryString = `SELECT * FROM stockprices INNER JOIN stockdistribution 
    ON stockprices.distributionid = stockdistribution.id 
    WHERE stockprices.companyabbriev = \'${companyAbbriev}\'`;
  db.result(queryString)
    .then(data => { 
      if (data.rows.length === 0) { callback(null, false); }
      else { callback(null, data.rows); }
    })
    .catch(err => { callback(err); })
}

function addCompany(companyEntry, distributionEntries, callback) {
  let { companyabbriev, company, stockspurchased, 
    yearhigh, yearlow, yearavg, currentprice } = companyEntry;
  let queryString = `INSERT INTO stockprices (companyabbriev, company, stockspurchased, 
    yearhigh, yearlow, yearavg, currentprice, distributionid) 
    VALUES (\'${companyabbriev}\', \'${company}\', ${stockspurchased}, 
    ${yearhigh}, ${yearlow}, ${yearavg}, ${currentprice}, DEFAULT) RETURNING distributionid;`;
  db.one(queryString)
    .then(result => {
        console.log(`DistId: ${result.distributionid}`);
        console.log(`${companyEntry.companyabbriev} inserted`);
        
        let distributionEntriesWithId = distributionEntries.map(div => { 
          return {...div, id: result.distributionid}; 
        })
        let distributionInsert = pgp.helpers.insert(distributionEntriesWithId, distributionColSet);
        db.none(distributionInsert)
          .then(() => { 
            console.log(`Distribution inserted`); 
            callback();
          })
          .catch((err) => callback(err) )
      })
    .catch((err) => { 
      console.log('Error inserting company');
      console.log(err);
      callback(err); });   
}

function deleteCompany(companyAbbriev, callback) {
  let queryString = `SELECT distributionid FROM stockprices 
    WHERE companyabbriev = \'${companyAbbriev}\';`;
  function deleteQueryString(tableName, propertyName, property) {
    return `DELETE FROM ${tableName} WHERE ${propertyName} = \'${property}\';`;
  }
  db.one(queryString)
    .then(result => {
      db.none(deleteQueryString('stockprices', 'companyabbriev', companyAbbriev))
        .then(() => {
          db.none(deleteQueryString('stockdistribution', 'id', result.distributionid))
            .then(() => { 
              console.log(`${companyAbbriev} deleted`);
              callback(); 
            })
            .catch((err) => { callback(err); })
        })
        .catch((err) => { callback(err); })
    })
    .catch((err) => { callback(err); });
}

module.exports = { getCompany, addCompany, deleteCompany };

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