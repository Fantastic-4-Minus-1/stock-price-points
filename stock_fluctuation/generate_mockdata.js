const faker = require('faker');
const fs = require('fs');
const path = require('path');

var data = function(numOfCompanies) {
  var results = [];
  for (var i = 0; i < numOfCompanies; i++) {
    var obj = {
      company: faker.company.companyName(),
      anaylst_percent: faker.random.number({ min: 1, max: 99 }),
      robinhood_owners: faker.random.number({ min: 20000, max: 200000 }),
      tickers: []
    };
    for (var j = 1; j < 5; j++) {
      var monday = getMonthlyWeekday(j, 'Monday', 'September', 2018);
      var tuesday = getMonthlyWeekday(j, 'Tuesday', 'September', 2018);
      var wednesday = getMonthlyWeekday(j, 'Wednesday', 'September', 2018);
      var thursday = getMonthlyWeekday(j, 'Thursday', 'September', 2018);
      var friday = getMonthlyWeekday(j, 'Friday', 'September', 2018);
      obj.tickers.push(
        { date: new Date(2018, 8, monday), price: timesAndPrice() },
        { date: new Date(2018, 8, tuesday), price: timesAndPrice() },
        { date: new Date(2018, 8, wednesday), price: timesAndPrice() },
        { date: new Date(2018, 8, thursday), price: timesAndPrice() },
        { date: new Date(2018, 8, friday), price: timesAndPrice() }
      );
    }
    results.push(obj);
  }
  return results;
};

function getMonthlyWeekday(n, d, m, y) {
  var targetDay,
    curDay = 0,
    i = 1,
    seekDay;
  if (d == 'Sunday') seekDay = 0;
  if (d == 'Monday') seekDay = 1;
  if (d == 'Tuesday') seekDay = 2;
  if (d == 'Wednesday') seekDay = 3;
  if (d == 'Thursday') seekDay = 4;
  if (d == 'Friday') seekDay = 5;
  if (d == 'Saturday') seekDay = 6;
  while (curDay < n && i < 31) {
    targetDay = new Date(i++ + ' ' + m + ' ' + y);
    if (targetDay.getDay() == seekDay) curDay++;
  }
  if (curDay == n) {
    targetDay = targetDay.getDate();
    return targetDay;
  } else {
    return false;
  }
}

function timesAndPrice() {
  var x = 10;
  var times = [];
  var startingTime = 540;

  for (var i = 0; startingTime < 18.05 * 60; i++) {
    var hh = Math.floor(startingTime / 60);
    var mm = startingTime % 60;
    var tempObj = {};
    if (hh >= 12) {
      tempObj['currentTime'] =
        ('0' + ((hh % 12) + 12)).slice(-2) + ':' + ('0' + mm).slice(-2);
    } else {
      tempObj['currentTime'] =
        ('0' + (hh % 12)).slice(-2) + ':' + ('0' + mm).slice(-2);
    }
    tempObj['currentPrice'] = faker.commerce.price(100.0, 150.7, 2);
    times.push(tempObj);
    startingTime = startingTime + x;
  }
  return times;
}

var output = data(99);
fs.writeFile(
  path.join(__dirname, 'seeds', 'companies.json'),
  JSON.stringify(output),
  err => {
    if (err) return console.log(err);
  }
);
