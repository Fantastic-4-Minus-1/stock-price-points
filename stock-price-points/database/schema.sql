/*  Create database called robinhood.
 *  Execute this file from the command line by typing:
 *    psql robinhood < schema.sql
 *  to create tables.*/

-- DROP DATABASE IF EXISTS robinhood;
-- CREATE DATABASE robinhood;

DROP TABLE IF EXISTS 
  astockprices, 
  bstockprices, 
  cstockprices,
  dstockprices,
  estockprices,
  fstockprices,
  gstockprices,
  hstockprices,
  istockprices,
  jstockprices,
  kstockprices,
  lstockprices,
  mstockprices,
  nstockprices,
  ostockprices,
  pstockprices,
  qstockprices,
  rstockprices,
  sstockprices,
  tstockprices,
  ustockprices, 
  vstockprices,
  wstockprices,
  xstockprices,
  ystockprices,
  zstockprices;

CREATE TABLE wstockprices (
  companyabbriev CHAR(5) NOT NULL,
  company VARCHAR(40) NOT NULL,
  weeks JSON[] NOT NULL,
  yearly JSON NOT NULL,
  currentprice MONEY[] NOT NULL
);

CREATE TABLE astockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE bstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE cstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE dstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE estockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE fstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE gstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE hstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE istockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE jstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE kstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE lstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE mstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE nstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE ostockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE pstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE qstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE rstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE sstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE tstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE ustockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE vstockprices AS SELECT * FROM wstockprices WHERE 0=1;

CREATE TABLE xstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE ystockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE zstockprices AS SELECT * FROM wstockprices WHERE 0=1;

GRANT ALL PRIVILEGES ON TABLE 
  astockprices, 
  bstockprices, 
  cstockprices,
  dstockprices,
  estockprices,
  fstockprices,
  gstockprices,
  hstockprices,
  istockprices,
  jstockprices,
  kstockprices,
  lstockprices,
  mstockprices,
  nstockprices,
  ostockprices,
  pstockprices,
  qstockprices,
  rstockprices,
  sstockprices,
  tstockprices,
  ustockprices,
  vstockprices,
  wstockprices,
  xstockprices,
  ystockprices,
  zstockprices TO jenn;

-- INSERT INTO users (id, name, balance) VALUES (17, "joel", 921.30);