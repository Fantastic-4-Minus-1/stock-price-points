const fs = require('fs');
const { alphabet } = require('./idGenerator');
// const { assembleTestData } = require('./dataGenerator');
const { assembleCSVTestData } = require('./dataGenerator');

const letters = alphabet.slice(0, 3);

// letters.forEach(letter => {
//   let wstream = fs.createWriteStream(`./data/seed/data${letter}.json`);
//   const dataSet = assembleTestData([letter], wstream, letter);
// });

letters.forEach(letter => {
  let wstream = fs.createWriteStream(`./data/seed/data${letter}.csv`);
  const dataSet = assembleCSVTestData([letter], wstream, letter);
});
