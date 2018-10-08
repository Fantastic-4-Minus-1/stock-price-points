const fs = require('fs');

const dataSetSize = 2500000;

const companyNames = {
  'A': 'Analytics',
  'B': 'Bouyer',
  'C': 'Caltronic',
  'D': 'Denature',
  'E': 'Enron',
  'F': 'Fenway',
  'G': 'Graphics',
  'H': 'Harriet',
  'I': 'Ingrain',
  'J': 'Johnson',
  'K': 'Kinetic',
  'L': 'LL',
  'M': 'Marriot',
  'N': 'Nahar',
  'O': 'Optics',
  'P': 'Penn. A.',
  'Q': 'Quan',
  'R': 'Rendi',
  'S': 'Solutions',
  'T': 'Technologies',
  'U': 'U.',
  'V': 'Vector',
  'W': 'Web',
  'X': 'Xavier',
  'Y': 'Y.',
  'Z': 'Zenic',
};

const range = (startChar, endChar) => {
  const result = [];
  const start = startChar.charCodeAt(0);
  const end = endChar.charCodeAt(0);
  for (let i = start; i <= end; i++) {
    result.push(String.fromCharCode(i));
  }
  return result;
};

const alphabet = range('A', 'Z');

const generateTickerSymbol = (set) => {
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

function generateCompanyNames(ticker) {
  return `${companyNames[ticker[0]]} ${companyNames[ticker[4]]}`;
}

// generates companyids.csv for Artillery load testing

// let loadTestFile = 'comp0,comp1,comp2,comp3,comp4,comp5,comp6,comp7,comp8,comp9\n';
// let countPerLine = 10;
// let tickers = generateTickerSymbol(alphabet.slice(0, 22));
// for (let i = 0; (i + countPerLine) < tickers.length; i += countPerLine) {
//   let line = tickers.slice(i, i + countPerLine).join(',');
//   loadTestFile = loadTestFile.concat(line, '\n');
// }

// fs.writeFile('./companyids.csv', loadTestFile, (err) => {
//   if (err) { console.log(err); }
// })

module.exports = { companyNames, alphabet, generateTickerSymbol, generateCompanyNames };