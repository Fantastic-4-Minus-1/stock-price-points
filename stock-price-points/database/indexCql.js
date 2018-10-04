// FILE NOT USED -- SEED DATA WITH:
// -   npm run load-cql for small batches
// -   cassandra-loader for mass seeding

// let currPath = __dirname.split('/');
// currPath = currPath.slice(0, currPath.length - 1).join('/');

// const Promise = require('bluebird');
// const readFile = Promise.promisify(require('fs').readFile);
// const writeFile = Promise.promisify(require('fs').writeFile);
// const cassandra = require('cassandra-driver');

// const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042'], keyspace: 'stockprices' });
// client.connect(function (err) {
//   if (err) { console.log(err); }
//   console.log('Connected');
// });

// function readData(letter) {
//   let seedPath = `${currPath}/data/seed/dataW-Wall.csv`
//   readFile(seedPath)
//     .then((data) => { return data.toString().split('\n'); })
//     .then((entries) => console.log(entries[0]))
//     .catch((err) => { console.log(err); })
// };

// readData('A');


// const query = 'INSERT INTO stockprices (companyabbriev, company, weeks, yearly, currentPrice) VALUES (?, ?, ?)';

// const params = [,,,,];
// client.execute(query, params, { prepare: true }, function (err) {
//   assert.ifError(err);
//   //Inserted in the cluster
// });