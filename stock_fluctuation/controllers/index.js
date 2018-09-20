const Company = require('../models/Company.js');

module.exports = {
  fetch: (req, res) => {
    Company.find({})
      .limit(4)
      .exec((err, companies) => {
        if (err) return console.log(err);
        res.json(companies);
      });
  },

  fetchCompany: (req, res) => {
    const company = req.params.company_name.split('-').join(' ');
    Company.find({ company: company }, (err, company) => {
      if (err) return console.log(err);
      res.json(company);
    });
  }
};
