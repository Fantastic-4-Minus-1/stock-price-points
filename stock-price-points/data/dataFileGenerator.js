const fs = require('fs');
const { companyNames, alphabet } = require('./idGenerator');

console.time('clock');

const dataSetSize = 100000; // number of companies

// generate ticker & associating data
const generateTickerSymbol = () => {
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
  uniqueTicker();
  return result;
};

// company names
function generateCompanyNames(ticker) {
  return `${companyNames[ticker[0]]} ${companyNames[ticker[4]]}`;
}

// price distribution
const numberOfDivs = 30; // number of bars
const maxPurchasedPerDiv = 800; // height of bar graph

// price variables
const marketPriceRange = [5, 350]; // range of annual average market prices for all companies
const dailyDevRange = [0.01, 0.08]; // deviation of current price from daily average throughout 1 day
const dailyPriceRange = [0.03, 0.02]; // deviation of daily average from annual market average
const currentTimeIntervals = 24; // simulate price changes every 10 min for half the business day (4 hrs total)

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

function assembleTestData(tickers) {
  let results = tickers.map(ticker => {
    let companyAbbriev = ticker;
    let company = generateCompanyNames(ticker);
    let weeks = generateDataDist();
    let yearly = generateAnnualData(weeks);
    let currentPrice = generateCurrentPrice(yearly.yearAverage);
    return { company, companyAbbriev, weeks, yearly, currentPrice };
  });
  return results;
}

const tickers = generateTickerSymbol();
const dataSet = assembleTestData(tickers);

fs.writeFile(__dirname + '/seed/data.json', JSON.stringify(dataSet), (err) => {
  if (err) { console.log(err); }
  console.log('File saved');
  console.timeEnd('clock');
})

console.log(dataSet.length);
console.log(dataSet[1]);

