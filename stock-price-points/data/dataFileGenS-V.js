const fs = require('fs');
const { alphabet } = require('./idGenerator');
const { assembleTestData, assembleCSVTestData } = require('./dataGenerator');

const letters = alphabet.slice(18, 22);

// letters.forEach(letter => {
//   let wstream = fs.createWriteStream(`./data/seed/data${letter}.json`);
//   const dataSet = assembleTestData([letter], wstream, letter);
// });

letters.forEach(letter => {
  let wstream = fs.createWriteStream(`./data/seed/data${letter}.csv`);
  const dataSet = assembleCSVTestData([letter], wstream, letter);
});
