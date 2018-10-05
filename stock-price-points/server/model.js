const { getCompany, addCompany, deleteCompany } = require('../database/index');

const model = {
  all: {
    get: (callback) => {
      Company.find({}, (err, data) => {
        if (err) { return callback(err); }
        callback(null, data);
      })
    }
  },
  company: {
    post: (body, callback) => {
      let { company, companyAbbriev, weeks, yearly, currentPrice } = body;
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
      addCompany(companyEntry, distributionEntries, (err, results) => {
        if (err) { callback(err); }
        if (!results) { callback(null, {}); }
        else { callback(null); }
      });

      // Company.find({ company }, null, (err, data) => {
      //   if (err) { return callback(err); }
      //   else if (!data) { console.log('Company already exists, use PUT to update'); }
      //   else {
      //     let newCompany = new Company({ company, companyAbbriev, weeks, yearly, currentPrice });
      //     newCompany.save((err) => {
      //       if (err) { callback(err); }
      //       callback();
      //     });
      //   }
      // })
    },
    get: (companyAbbriev, callback) => {
      getCompany(companyAbbriev, (err, results) => {
        if (err) { callback(err); }
        if (!results) { callback(null, {}); }
        else { callback(null, formatForClient(results)); }
      });
    },
    put: (body, callback) => {
      let { company, companyAbbriev, weeks, yearly, currentPrice } = body;
      Company.findOneAndUpdate({ company }, { company, companyAbbriev, weeks, yearly, currentPrice }, null, (err, data) => {
        if (err) { return callback(err); }
        else if (!data) {
          newCompany.save((err) => {
            if (err) { callback(err); }
            callback();
          });
        } else { 
          console.log('Updated');
          callback(); 
        }
      });
    },
    delete: (companyAbbriev, callback) => {
      deleteCompany(companyAbbriev, (err) => {
        if (err) { callback(err); }
        callback();
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

}

module.exports = model;