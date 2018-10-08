const fs = require('fs');

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

function genSQLSchema(tableName) {
  let dropTable = `DROP TABLE IF EXISTS ${tableName};`
  let createTable = `CREATE TABLE ${tableName} (
    companyabbriev CHAR(5) NOT NULL,
    company VARCHAR(40) NOT NULL,
    weeks TEXT NOT NULL,
    yearly TEXT NOT NULL,
    currentprice TEXT NOT NULL,
    PRIMARY KEY (companyabbriev)
  );`;
  let allData = ``;
  alphabet.forEach(letter => {
    allData += `\COPY stockprices FROM './data/seed/data${letter}.csv' WITH DELIMITER AS ',' CSV HEADER;\n`;
  })

  let createIndex = `CREATE INDEX id ON stockprices USING HASH (companyabbriev);`;
  let grantPrivileges = `GRANT ALL PRIVILEGES ON TABLE ${tableName} TO jenn;`;
  return [dropTable, createTable, allData, createIndex, grantPrivileges].join('\n');
}

let scriptSQL = genSQLSchema('stockprices');

fs.writeFile(`database/schematest.sql`, scriptSQL, (err) => {
  if (err) { console.log(err); }
  console.log('SQL schema saved');
})