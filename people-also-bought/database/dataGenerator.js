var test = function(x) {
    var results = [];
    for (var i = 0; i < x; i++ ) {
        var obj = {
            company: faker.company.companyName(),
            currentDay: timesAndPrice(),
            }
        results.push(JSON.stringify(obj));
    }
    return results;
}

function timesAndPrice() {
    var x = 10;
    var times = [];
    var startTime = 540;
    var ap = ['am', 'pm'];

    for (var i = 0; startTime < 18.05*60; i++) {

        var hh = Math.floor(startTime/60);
        var mm = (startTime%60);
      var tempObj = {};
      tempObj['currentTime'] = ("0" + (hh%12)).slice(-2) + ":" + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)];
      tempObj['currentPrice'] = parseFloat(((Math.random() * Math.floor(500)) + 50).toFixed(2)); 
        times.push(tempObj);
        startTime = startTime + x;
    }
    return times;
}



var output = test(99);
console.log(output)





// hacker: faker.hacker.abbreviation() => shows abbreviations if we want to use it for Stock 
// faker.finance.amount(); => another way to show the random prices 
