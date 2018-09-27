console.time('clock');

const maxEntries = 1000000;

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

const generateTickerSymbol = () => {
  const result = [];
  let count = 0;
  const uniqueTicker = (current = '') => {
    if (count >= maxEntries) { return; }
    if (current.length === 5) {
      count++;
      return result.push(current);
    }
    alphabet.forEach(char => uniqueTicker(current + char));
  };
  uniqueTicker();
  return result;
};

function generateCompanyNames(ticker) {
  const names = [];
  ticker.map(uniqueTicker => {
    names.push(`${companyNames[uniqueTicker[0]]} ${companyNames[uniqueTicker[4]]}`);
  })
  return names;
}

const ticker = generateTickerSymbol();
const names = generateCompanyNames(ticker);

console.log(ticker.length);
console.log(ticker[0]);

console.log(names.length);
console.log(names.slice(0, 10));

console.timeEnd('clock');