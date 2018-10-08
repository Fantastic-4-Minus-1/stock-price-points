const { getCompany, addCompany, updateCompany, deleteCompany } = require('../database/index');
const Promise = require('bluebird');

const model = {
  all: {
    get: (callback) => {
      // Do not return all database entries
      callback(null, {});
    }
  },
  company: {
    post: (body) => {
      let { companyEntry, distributionEntries } = formatForDatabase(body);
      return new Promise((resolve, reject) => {
        addCompany(companyEntry, distributionEntries)
          .then((results) => {
            if (!results) { resolve({}) }
            else { resolve(); }
          })
          .catch((err) => { reject(err); })
          // if company already exists, return 'exists'
      })
    },
    get: (companyAbbriev) => {
      return new Promise((resolve, reject) => {
        getCompany(companyAbbriev)
          .then((results) => {
            if (!results) { resolve({}); }
            else { resolve(formatForClient(results)); }
          })
          .catch((err) => { reject(err); })
      })
    },
    // get: (companyAbbriev, callback) => {
    //   getCompany(companyAbbriev, (err, results) => {
    //     if (err) { callback(err); }
    //     if (!results) { callback(null, {}); }
    //     // else { callback(null, results); }
    //     else { callback(null, formatForClient(results)); }
    //   });
    // },
    put: (body) => {
      let { companyEntry, distributionEntries } = formatForDatabase(body);
      return new Promise((resolve, reject) => {
        updateCompany(companyEntry, distributionEntries)
          .then(results => {
            if (!results) { resolve({}) }
            else { resolve(results); }
          })
          .catch(err => { reject(err); })
          // if company not found, save companyEntry
      })
    },
    delete: (companyAbbriev) => {
      return new Promise((resolve, reject) => {
        deleteCompany(companyAbbriev)
          .then(() => resolve())
          .catch(err => reject(err))
          // if company not found, return null
      })
    }
  }
}

function formatForClient(databaseResults) {
  let yearly = {
    stocksPurchasedYear: databaseResults[0].stockspurchased,
    yearHighest: Number(databaseResults[0].yearhigh),
    yearLowest: Number(databaseResults[0].yearlow),
    yearAverage: Number(databaseResults[0].yearavg)
  };
  let weeks = databaseResults.map(week => {
    return { 
      weekIndex: week.divindex,
      weekAverage: Number(week.divaverage),
      weekStocksPurchased: week.divstockspurchased
    }
  });
  let entry = {
    company: databaseResults[0].company,
    companyAbbriev: databaseResults[0].companyabbriev,
    weeks: weeks,
    yearly: yearly,
    currentPrice: [ Number(databaseResults[0].currentprice) ]
  };
  return entry;
}

function formatForDatabase(clientParams) {
  let { company, companyAbbriev, weeks, yearly, currentPrice } = clientParams;
    let companyEntry = {
      companyabbriev: companyAbbriev,
      company: company,
      stockspurchased: yearly.stocksPurchasedYear,
      yearhigh: yearly.yearHighest,
      yearlow: yearly.yearLowest,
      yearavg: yearly.yearAverage,
      currentprice: currentPrice[0]
    };
    let distributionEntries = weeks.map(week => {
      return {
        divindex: week.weekIndex,
        divaverage: week.weekAverage,
        divstockspurchased: week.weekStocksPurchased
      }
    });
  return { companyEntry, distributionEntries };
}

module.exports = model;