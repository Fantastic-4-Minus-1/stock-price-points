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

function genCQLSchema(tableName) {
  let dropKeyspace = `DROP KEYSPACE IF EXISTS ${tableName};`
  let createKeyspace = `CREATE KEYSPACE IF NOT EXISTS ${tableName} WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };`;
  let createTable = `CREATE TABLE ${tableName} ( 
    companyabbriev text, 
    company text, 
    weeks text, 
    yearly text, 
    currentprice text, 
    primary key (companyabbriev)
  );`;
  let copyAllData = '';
  alphabet.forEach(letter => {
    copyAllData.concat(`COPY ${tableName} (companyabbriev, company, weeks, yearly, currentPrice) FROM 'data/seed/data${letter}.csv' WITH HEADER = TRUE AND DELIMITER = ',';\n`);
  });
  return [dropKeyspace, createKeyspace, createTable, copyAllData].join('/n');
}

let scriptSQL = genSQLSchema('stockprices');
let scriptCQL = genCQLSchema('stockprices');

fs.writeFile(`database/schematest.sql`, script, (err) => {
  if (err) { console.log(err); }
  console.log('Schema saved');
})

fs.writeFile(`database/schematest.cql`, script, (err) => {
  if (err) { console.log(err); }
  console.log('Schema saved');
})