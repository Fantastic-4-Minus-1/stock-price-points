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
  let useKeyspace = `USE ${tableName};`
  let createTable = `CREATE TABLE ${tableName} ( 
    companyabbriev varchar, 
    company varchar, 
    stockspurchased int, 
    yearhigh decimal, 
    yearlow decimal, 
    yearavg decimal,
    currentprice decimal,
    week1average decimal,
    week1stockspurchased int,
    week2average decimal,
    week2stockspurchased int,
    week3average decimal,
    week3stockspurchased int,
    week4average decimal,
    week4stockspurchased int,
    week5average decimal,
    week5stockspurchased int,
    week6average decimal,
    week6stockspurchased int,
    week7average decimal,
    week7stockspurchased int,
    week8average decimal,
    week8stockspurchased int,
    week9average decimal,
    week9stockspurchased int,
    week10average decimal,
    week10stockspurchased int,
    week11average decimal,
    week11stockspurchased int,
    week12average decimal,
    week12stockspurchased int,
    week13average decimal,
    week13stockspurchased int,
    week14average decimal,
    week14stockspurchased int,
    week15average decimal,
    week15stockspurchased int,
    primary key (companyabbriev)
  );`;
  let copyAllData = '';
  alphabet.forEach(letter => {
    copyAllData.concat(`COPY ${tableName} (companyabbriev,
      company,
      stockspurchased,
      yearhigh,
      yearlow,
      yearavg,
      currentprice,
      week1average, 
      week1stockspurchased,
      week2average, 
      week2stockspurchased,
      week3average, 
      week3stockspurchased,
      week4average, 
      week4stockspurchased,
      week5average, 
      week5stockspurchased,
      week6average, 
      week6stockspurchased,
      week7average, 
      week7stockspurchased,
      week8average, 
      week8stockspurchased,
      week9average, 
      week9stockspurchased,
      week10average, 
      week10stockspurchased,
      week11average, 
      week11stockspurchased,
      week12average, 
      week12stockspurchased,
      week13average, 
      week13stockspurchased,
      week14average, 
      week14stockspurchased,
      week15average, 
      week15stockspurchased
      ) FROM 'data/seed/data${letter}.csv' WITH HEADER = TRUE AND DELIMITER = '|';\n`);
  });
  return [dropKeyspace, createKeyspace, useKeyspace, createTable, copyAllData].join('/n');
}

let scriptSQL = genSQLSchema('stockprices');
let scriptCQL = genCQLSchema('stockprices');

fs.writeFile(`database/schematest.sql`, scriptSQL, (err) => {
  if (err) { console.log(err); }
  console.log('SQL schema saved');
})

fs.writeFile(`database/schematest.cql`, scriptCQL, (err) => {
  if (err) { console.log(err); }
  console.log('NoSQL schema saved');
})