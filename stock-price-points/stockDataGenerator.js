const faker = require('faker');

function getRandomValue(min, max) {
  return Math.random() * (max - min) + min;
}

function percentageChange(valOne, valTwo) {
  return (((valTwo - valOne) / valOne) * 100);
}

function stocksPurchased(startingVal, weekAverage) {
  // AVERAGE PRICE
  let returnVal;
  if (percentageChange(startingVal, weekAverage) < 4
        && percentageChange(startingVal, weekAverage) > -4) {
    returnVal = Math.floor(getRandomValue(550, getRandomValue(1250, 2300)));
    // HIGH PRICE
  } if (percentageChange(startingVal, weekAverage) > 4) {
    returnVal = Math.floor(getRandomValue(70, getRandomValue(150, 450)));
    // LOW PRICE
  } if (percentageChange(startingVal, weekAverage) < -4) {
    returnVal = Math.floor(getRandomValue(500, getRandomValue(750, 1300)));
  }
  return returnVal;
}

let weeklyValues = [];
let weekAverages = [];
let totalStocksPurchased = 0;
function weekValues(startingVal, index) {
  const minusSomePercent = startingVal - (startingVal * getRandomValue(0.03, 0.38));
  const plusSomePercent = startingVal + (startingVal * getRandomValue(0.03, 0.52));

  const weekHigh = parseFloat(getRandomValue(startingVal, plusSomePercent).toFixed(2));
  const weekLow = parseFloat(getRandomValue(minusSomePercent, startingVal).toFixed(2));
  const weekAverage = parseFloat(((weekLow + weekHigh) / 2).toFixed(2));
  const weekStocksPurchased = stocksPurchased(startingVal, weekAverage);

  const weekObj = {
    weekIndex: index,
    weekHigh,
    weekLow,
    weekAverage,
    weekStocksPurchased,
  };

  weeklyValues.push(weekObj.weekLow, weekObj.weekHigh);
  weekAverages.push(weekObj.weekAverage);
  totalStocksPurchased += weekStocksPurchased;
  return weekObj;
}

function xWeeks(numOfWeeks, avgCompanyValue) {
  const results = [];
  for (let i = 0; i < numOfWeeks; i += 1) {
    const oneWeek = weekValues(avgCompanyValue, i + 1);
    results.push(oneWeek);
    // results.push(JSON.stringify(oneWeek));
  }
  return results;
}

const add = (a, b) => a + b;

function testCompany(x) {
  const results = [];

  for (let i = 0; i < x; i += 1) {
    const companyName = faker.company.companyName();
    const startingVal = getRandomValue(9, getRandomValue(70, 780));
    const companyObj = {
      company: companyName,
      weeks: xWeeks(30, startingVal),
      yearly: {
        stocksPurchasedYear: totalStocksPurchased,
        yearHighest: Math.max.apply(null, weeklyValues),
        yearLowest: Math.min.apply(null, weeklyValues),
        yearAverage: parseFloat(((weekAverages.reduce(add)) / 30).toFixed(2)),
      },
      currentPrice: getRandomValue(this.yearly.yearLowest, this.yearly.yearHighest),

    };
    results.push(companyObj); //
    // results.push(JSON.stringify(companyObj)); //
    weeklyValues = [];
    weekAverages = [];
    totalStocksPurchased = 0;
  }

  return results;
}

// var output = (testCompany(99));
const output = JSON.stringify(testCompany(99));

console.log(output);
