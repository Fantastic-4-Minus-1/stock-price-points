const fs = require('fs');
const { companyNames, alphabet } = require('./idGenerator');

let dataSetSize = 2500000; // number of companies
// let dataSetSize = 5;

// generate ticker & associating data
const generateTickerSymbol = (set) => { 
  // dataSetSize = (set[0] === 'V') ? 403504 : dataSetSize;
  const result = [];
  let count = 0;
  const uniqueTicker = (current = '') => {
    if (count >= dataSetSize) { return; }
    if (current.length === 5) {
      count++;
      return result.push(current);
    }
    alphabet.forEach(char => uniqueTicker(current + char));
  };
  set.forEach(letter => { uniqueTicker(letter) });
  return result;
};

// company names
function generateCompanyNames(ticker) {
  return `${companyNames[ticker[0]]} ${companyNames[ticker[4]]}`;
}

// price distribution
const numberOfDivs = 15; // number of bars
const maxPurchasedPerDiv = 800; // height of bar graph

// price variables
const marketPriceRange = [5, 350]; // range of annual average market prices for all companies
const dailyDevRange = [0.01, 0.08]; // deviation of current price from daily average throughout 1 day
const dailyPriceRange = [0.03, 0.02]; // deviation of daily average from annual market average
const currentTimeIntervals = 1; // simulate price changes every 10 min for half the business day (4 hrs total)

const posOrNeg = Math.random() < 0.5 ? -1 : 1;

function trunc(number) { return +number.toFixed(2); }

function randomNumber(min, max) {
 return Math.random() * (max - min) + min;
};

function generateDataDist() {
  let results = [];
  let annualMin = trunc(0.5 * randomNumber(marketPriceRange[0], marketPriceRange[1]));
  let annualMax = trunc(annualMin * randomNumber(1.1, 3)); // max is 110-300% of min
  let divSize = trunc((annualMax - annualMin) / numberOfDivs);
  let prevDivValue;
  for (var i = 1; i <= numberOfDivs; i++) {
    let divMin = trunc(divSize * (i - 1) + annualMin);
    let divAvg = trunc(Math.random(divSize) + divMin);
    let quantity;
    if (i === 1) {
      quantity = Math.round(Math.random() * maxPurchasedPerDiv);
      prevDivValue = quantity;
    } else {
      quantity = Math.abs(Math.round(randomNumber(-1, 1) * maxPurchasedPerDiv * 0.7 - prevDivValue));
      prevDivValue = quantity;
    }
    results.push({
      weekIndex: i,
      weekAverage: divAvg,
      weekStocksPurchased: quantity
    })
  }
  return results;
}

function generateAnnualData(distributionData) {
  let annualMin;
  let annualMax;
  let totalSharesPurchased = 0;
  let weightedSum = 0;
  for (var div of distributionData) {
    if (!annualMin || div.weekAverage < annualMin) { annualMin = div.weekAverage; }
    if (!annualMax || div.weekAverage > annualMax) { annualMax = div.weekAverage; }
    totalSharesPurchased += div.weekStocksPurchased;
    weightedSum += div.weekStocksPurchased * div.weekAverage;
  }
  return {
    stocksPurchasedYear: totalSharesPurchased,
    yearHighest: annualMax,
    yearLowest: annualMin,
    yearAverage: trunc(weightedSum / totalSharesPurchased)
  };
}

function generateCurrentPrice(annualAvg, minDiff = dailyPriceRange[0], maxDiff = dailyPriceRange[1]) {
  const dailyAvg = +((randomNumber(minDiff, maxDiff) + 1) * annualAvg).toFixed(2);
  const currentPrices = [];

  for (let i = 0; i < currentTimeIntervals; i++) {
    currentPrices.push(+(dailyAvg * (1 + randomNumber(-1, 1) * randomNumber(dailyDevRange[0], dailyDevRange[1]))).toFixed(2));
  }
  return currentPrices;
}

// Generates JSON data files
// function assembleTestData(set, wstream, label) {
//   console.time(`clock${label}`);
//   const tickers = generateTickerSymbol(set);

//   wstream.write('[');

//   tickers.forEach((ticker, index) => {
//     let companyAbbriev = ticker;
//     let company = generateCompanyNames(ticker);
//     let weeks = generateDataDist();
//     let yearly = generateAnnualData(weeks);
//     let currentPrice = generateCurrentPrice(yearly.yearAverage);
//     let dataEntry = { company, companyAbbriev, weeks, yearly, currentPrice };
//     wstream.write(JSON.stringify(dataEntry), () => {  });
//     if (index < tickers.length - 1) { wstream.write(','); }
//     else { 
//       console.log('Last entry: ', ticker);
//       console.log(index + 1, 'entries logged'); 
//     }
//   });
//     // fs.appendFile(`${__dirname}/seed/data.json`, JSON.stringify(dataSet) + ',', (err) => {
//     //   if (err) { console.log(err); }
//     //   console.log('Entry saved');
//     //   console.time('clock');
//     // })
//   wstream.write(']');
//   wstream.end();

//   wstream.on('finish', function () {
//     console.timeEnd(`clock${label}`);
//   });
// }

// Generates relational CSV data files
// function assembleCSVTestData(set, weekIdCount) {
//   console.time(`generate`);
//   // let wstream = fs.createWriteStream(`./data/seed/data.csv`);
//   // let wstreamWeek = fs.createWriteStream(`./data/seed/dataWeek.csv`);
//   let wstream = fs.createWriteStream(`./data/seed/data${set[0]}-${set[set.length-1]}all.csv`);
//   let wstreamWeek = fs.createWriteStream(`./data/seed/dataWeek${set[0]}-${set[set.length-1]}all.csv`);
//   const tickers = generateTickerSymbol(set);
//   let weekId = weekIdCount * 456976 + 1;

//   wstream.write('companyabbriev|company|stockspurchased|yearhigh|yearlow|yearavg|currentprice|weekid\n');
//   wstreamWeek.write('id|weekindex|weekaverage|weekstockpurchased\n');

//   tickers.forEach((ticker, index) => {
//     let companyAbbriev = ticker;
//     let company = generateCompanyNames(ticker);
//     let weeks = generateDataDist();
//     let yearly = generateAnnualData(weeks);
//     let currentPrice = generateCurrentPrice(yearly.yearAverage);
//     let dataEntry = [companyAbbriev,
//       company, 
//       yearly.stocksPurchasedYear, 
//       yearly.yearHighest,
//       yearly.yearLowest,
//       yearly.yearAverage,
//       currentPrice,
//       weekId].join('|').concat('\n');
//     let dataEntryWeek = weeks.map(week => {
//       return `${weekId}|${week.weekIndex}|${week.weekAverage}|${week.weekStocksPurchased}`
//     }).join('\n').concat('\n');
//     if (index < tickers.length - 1) { 
//       wstream.write(dataEntry); 
//       wstreamWeek.write(dataEntryWeek);
//     }
//     else { 
//       wstream.write(dataEntry);
//       wstreamWeek.write(dataEntryWeek);
//       console.log(`Last entry: ${ticker}, weekId: ${weekId}`);
//       console.log(`${index + 1} entries logged`); 
//     }
//     weekId++;
//   });
//   wstream.end();

//   wstream.on('finish', function () {
//     console.timeEnd(`generate`);
//   });
// }

// Generates nonrelational CSV data files (single table)
function assembleCombinedCSVTestData(set, weekIdCount) {
  console.time(`generate`);
  let wstream = fs.createWriteStream(`./data/seed/data${set[0]}-${set[set.length-1]}all.csv`);
  const tickers = generateTickerSymbol(set);

  wstream.write('companyabbriev|company|stockspurchased|yearhigh|yearlow|yearavg|currentprice');
  for (let i = 1; i <= numberOfDivs; i++) {
    wstream.write(`|week${i}average|week${i}stockspurchased`);
  }
  wstream.write('\n');

  tickers.forEach((ticker, index) => {
    let companyAbbriev = ticker;
    let company = generateCompanyNames(ticker);
    let weeks = generateDataDist();
    let yearly = generateAnnualData(weeks);
    let currentPrice = generateCurrentPrice(yearly.yearAverage);
    let dataEntry = [companyAbbriev,
      company, 
      yearly.stocksPurchasedYear, 
      yearly.yearHighest,
      yearly.yearLowest,
      yearly.yearAverage,
      currentPrice].join('|');
    let dataEntryWeek = weeks.map(week => {
      return `${week.weekAverage}|${week.weekStocksPurchased}`
    }).join('|');
    if (index < tickers.length - 1) { 
      wstream.write(`${dataEntry}|${dataEntryWeek}\n`); 
    }
    else { 
      wstream.write(`${dataEntry}|${dataEntryWeek}\n`);
      console.log(`Last entry: ${ticker}`);
      console.log(`${index + 1} entries logged`); 
    }
  });
  wstream.end();

  wstream.on('finish', function () {
    console.timeEnd(`generate`);
  });
}

// test
// assembleCSVTestData(alphabet.slice(22, 23), 23);
// assembleCombinedCSVTestData(alphabet.slice(22, 23), 23);

// assembleCSVTestData(alphabet.slice(0, 5), 0);
// assembleCombinedCSVTestData(alphabet.slice(0, 5), 0);
// assembleCSVTestData(alphabet.slice(5, 10), 5);
// assembleCombinedCSVTestData(alphabet.slice(5, 10), 5);
// assembleCSVTestData(alphabet.slice(10, 15), 10);
// assembleCombinedCSVTestData(alphabet.slice(10, 15), 10);
// assembleCSVTestData(alphabet.slice(15, 20), 15);
// assembleCombinedCSVTestData(alphabet.slice(15, 20), 15);
// assembleCSVTestData(alphabet.slice(20, 22), 20);
// assembleCombinedCSVTestData(alphabet.slice(20, 22), 20);

assembleCombinedCSVTestData(alphabet.slice(21, 22), 21);

// module.exports = { assembleCSVTestData }



