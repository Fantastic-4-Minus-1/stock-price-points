const mongoose = require('mongoose');
require('dotenv').config();

const { MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('We\'re connected to Database!');
});

const companySchema = new mongoose.Schema({
  company: String,
  companyAbbriev: String,
  weeks: [],
  yearly: {
    stocksPurchasedYear: Number,
    yearHighest: Number,
    yearLowest: Number,
    yearAverage: Number
  },
  currentPrice: [Number],
});

const Company = mongoose.model('Company', companySchema);

module.exports = {
  Company,
  mongoose,
};
