const mongoose = require("mongoose");
// schemas for stocks
const PriceAndTimeSchema = new mongoose.Schema({
  currentTime: String,
  currentPrice: String
});

const TickerSchema = new mongoose.Schema({
  date: String,
  price: [PriceAndTimeSchema]
});

const CompanySchema = new mongoose.Schema({
  company: { type: String, unique: true },
  anaylst_percent: Number,
  robinhood_owners: Number,
  tickers: [TickerSchema]
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
