const Company = require('../database');

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
      Company.find({ company }, null, (err, data) => {
        if (err) { return callback(err); }
        else if (!data) { console.log('Company already exists, use PUT to update'); }
        else {
          let newCompany = new Company({ company, companyAbbriev, weeks, yearly, currentPrice });
          newCompany.save((err) => {
            if (err) { callback(err); }
            callback();
          });
        }
      })
    },
    get: (company, callback) => {
      Company.find({ company }, (err, data) => {
        if (err) { return callback(err); }
        callback(null, data);
      })
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
    delete: (company, callback) => {
      Company.findOneAndDelete({ company }, (err, data) => {
        if (err) { return callback(err); }
        else if (!data) { console.log('Company not found') }
        callback();
      })
    }
  }
}

module.exports = model;