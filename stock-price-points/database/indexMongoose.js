// const mongoose = require('mongoose');
// require('dotenv').config();

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err) => {
//   console.log(err || 'Connected to database')
// });

// const companySchema = new mongoose.Schema({
//   company: String,
//   companyAbbriev: String,
//   weeks: [],
//   yearly: {
//     stocksPurchasedYear: Number,
//     yearHighest: Number,
//     yearLowest: Number,
//     yearAverage: Number
//   },
//   currentPrice: [Number],
// });

// const Company = mongoose.model('Company', companySchema);

// module.exports = Company;
