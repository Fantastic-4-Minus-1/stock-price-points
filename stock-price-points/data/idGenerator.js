const dataSetSize = 10000000;

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

const set = range('A', 'V');
const ticker = generateTickerSymbol(set);

// console.log(ticker.length);
// console.log(ticker[0]);
// console.log(ticker[ticker.length - 1]);

// console.log(26 * 26 * 26 * 26); // 456976
// console.log(10000000 % 456976); // 403504
// console.log(456976 - (10000000 % 456976)); // 53472

module.exports = { companyNames, alphabet };