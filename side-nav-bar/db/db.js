const mongoose = require('mongoose');
// const URI = 'mongodb://localhost/fecdata';
// var db = mongoose.connection;

//===== DBSchema =======

const companiesSchema = new mongoose.Schema({
	company: String,
	currentDay: Array
});

const Company = mongoose.model('Company', companiesSchema);


// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log("we're connected to the DB!");
// });

module.exports = Company;
