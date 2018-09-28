const fs = require('fs');
const { alphabet } = require('./idGenerator');
const { assembleTestData } = require('./dataGenerator');

const letters = alphabet.slice(15, 18);

letters.forEach(letter => {
  let wstream = fs.createWriteStream(`./data/seed/data${letter}.json`);
  const dataSet = assembleTestData([letter], wstream, letter);
});
