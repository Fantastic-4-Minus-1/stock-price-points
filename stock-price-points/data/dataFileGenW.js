const fs = require('fs');
const { alphabet } = require('./idGenerator');
const { assembleCSVTestData, assembleCSVWeekData } = require('./dataGenerator');

// const letters = alphabet.slice(22, 23);
// const letters = alphabet.slice(0, 1);

// letters.forEach(letter => {
//   let wstream = fs.createWriteStream(`./data/seed/data${letter}1.json`);
//   const dataSet = assembleTestData([letter], wstream, letter);
// });

letters.forEach(letter => {
    let wstream = fs.createWriteStream(`./data/seed/dataZZ.csv`);
    const dataSet = assembleCSVWeekData([letter], wstream, letter);
});

// let string = "[{\"weekIndex\":1\\,\"weekAverage\":73.22\\,\"weekStocksPurchased\":334}\\,{\"weekIndex\":2\\,\"weekAverage\":77.64\\,\"weekStocksPurchased\":668}\\,{\"weekIndex\":3\\,\"weekAverage\":82.78\\,\"weekStocksPurchased\":921}\\,{\"weekIndex\":4\\,\"weekAverage\":87.25\\,\"weekStocksPurchased\":917}\\,{\"weekIndex\":5\\,\"weekAverage\":93.08\\,\"weekStocksPurchased\":611}\\,{\"weekIndex\":6\\,\"weekAverage\":97.7\\,\"weekStocksPurchased\":553}\\,{\"weekIndex\":7\\,\"weekAverage\":102.33\\,\"weekStocksPurchased\":582}\\,{\"weekIndex\":8\\,\"weekAverage\":107.69\\,\"weekStocksPurchased\":417}\\,{\"weekIndex\":9\\,\"weekAverage\":112.19\\,\"weekStocksPurchased\":510}\\,{\"weekIndex\":10\\,\"weekAverage\":117\\,\"weekStocksPurchased\":876}\\,{\"weekIndex\":11\\,\"weekAverage\":122.69\\,\"weekStocksPurchased\":368}\\,{\"weekIndex\":12\\,\"weekAverage\":127.79\\,\"weekStocksPurchased\":658}\\,{\"weekIndex\":13\\,\"weekAverage\":132.24\\,\"weekStocksPurchased\":711}\\,{\"weekIndex\":14\\,\"weekAverage\":137.33\\,\"weekStocksPurchased\":578}\\,{\"weekIndex\":15\\,\"weekAverage\":142.35\\,\"weekStocksPurchased\":629}]";
// console.log(JSON.parse(string).length);
