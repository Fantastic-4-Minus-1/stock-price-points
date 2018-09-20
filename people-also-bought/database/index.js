// var faker = require('faker');
var mongoose = require('mongoose');
// var server = require('../server/server.js');
// mongoose.connect('mongodb://localhost/people-also-bought');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('Ruby DB Connected');
// });

// function find = (callback) {
  
// }

var companySchema = new mongoose.Schema({
  company: String,
  currentDay: Array
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;