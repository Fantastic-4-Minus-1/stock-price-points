/*  Create database called robinhood.
 *  Execute this file from the command line by typing:
 *    psql robinhood < schema.sql
 *  to create tables.*/

-- DROP DATABASE IF EXISTS robinhood;
-- CREATE DATABASE robinhood;

DROP TABLE IF EXISTS 
  -- astockprices, 
  -- bstockprices, 
  -- cstockprices,
  -- dstockprices,
  -- estockprices,
  -- fstockprices,
  -- gstockprices,
  -- hstockprices,
  -- istockprices,
  -- jstockprices,
  -- kstockprices,
  -- lstockprices,
  -- mstockprices,
  -- nstockprices,
  -- ostockprices,
  -- pstockprices,
  -- qstockprices,
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
  weeks TEXT NOT NULL,
  yearly TEXT NOT NULL,
  currentprice TEXT NOT NULL,
  PRIMARY KEY (companyabbriev)
);

-- CREATE TABLE astockprices AS SELECT * FROM wstockprices WHERE 0=1;
-- CREATE TABLE bstockprices AS SELECT * FROM wstockprices WHERE 0=1;
-- CREATE TABLE cstockprices AS SELECT * FROM wstockprices WHERE 0=1;
-- CREATE TABLE dstockprices AS SELECT * FROM wstockprices WHERE 0=1;
-- CREATE TABLE estockprices AS SELECT * FROM wstockprices WHERE 0=1;
-- CREATE TABLE fstockprices AS SELECT * FROM wstockprices WHERE 0=1;
-- CREATE TABLE gstockprices AS SELECT * FROM wstockprices WHERE 0=1;
-- CREATE TABLE hstockprices AS SELECT * FROM wstockprices WHERE 0=1;
-- CREATE TABLE istockprices AS SELECT * FROM wstockprices WHERE 0=1;
-- CREATE TABLE jstockprices AS SELECT * FROM wstockprices WHERE 0=1;
-- CREATE TABLE kstockprices AS SELECT * FROM wstockprices WHERE 0=1;
-- CREATE TABLE lstockprices AS SELECT * FROM wstockprices WHERE 0=1;
-- CREATE TABLE mstockprices AS SELECT * FROM wstockprices WHERE 0=1;
-- CREATE TABLE nstockprices AS SELECT * FROM wstockprices WHERE 0=1;
-- CREATE TABLE ostockprices AS SELECT * FROM wstockprices WHERE 0=1;
-- CREATE TABLE pstockprices AS SELECT * FROM wstockprices WHERE 0=1;
-- CREATE TABLE qstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE rstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE sstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE tstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE ustockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE vstockprices AS SELECT * FROM wstockprices WHERE 0=1;

CREATE TABLE xstockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE ystockprices AS SELECT * FROM wstockprices WHERE 0=1;
CREATE TABLE zstockprices AS SELECT * FROM wstockprices WHERE 0=1;

-- \COPY astockprices FROM './data/seed/dataA.csv' WITH DELIMITER AS ',' CSV HEADER;
-- \COPY bstockprices FROM './data/seed/dataB.csv' WITH DELIMITER AS ',' CSV HEADER;
-- \COPY cstockprices FROM './data/seed/dataC.csv' WITH DELIMITER AS ',' CSV HEADER;
-- \COPY dstockprices FROM './data/seed/dataD.csv' WITH DELIMITER AS ',' CSV HEADER;
-- \COPY estockprices FROM './data/seed/dataE.csv' WITH DELIMITER AS ',' CSV HEADER;
-- \COPY fstockprices FROM './data/seed/dataF.csv' WITH DELIMITER AS ',' CSV HEADER;
-- \COPY gstockprices FROM './data/seed/dataG.csv' WITH DELIMITER AS ',' CSV HEADER;
-- \COPY hstockprices FROM './data/seed/dataH.csv' WITH DELIMITER AS ',' CSV HEADER;
-- \COPY istockprices FROM './data/seed/dataI.csv' WITH DELIMITER AS ',' CSV HEADER;
-- \COPY jstockprices FROM './data/seed/dataJ.csv' WITH DELIMITER AS ',' CSV HEADER;
-- \COPY kstockprices FROM './data/seed/dataK.csv' WITH DELIMITER AS ',' CSV HEADER;
-- \COPY lstockprices FROM './data/seed/dataL.csv' WITH DELIMITER AS ',' CSV HEADER;
-- \COPY mstockprices FROM './data/seed/dataM.csv' WITH DELIMITER AS ',' CSV HEADER;
-- \COPY nstockprices FROM './data/seed/dataN.csv' WITH DELIMITER AS ',' CSV HEADER;
-- \COPY ostockprices FROM './data/seed/dataO.csv' WITH DELIMITER AS ',' CSV HEADER;
-- \COPY pstockprices FROM './data/seed/dataP.csv' WITH DELIMITER AS ',' CSV HEADER;
-- \COPY qstockprices FROM './data/seed/dataQ.csv' WITH DELIMITER AS ',' CSV HEADER;
\COPY rstockprices FROM './data/seed/dataR.csv' WITH DELIMITER AS ',' CSV HEADER;
\COPY sstockprices FROM './data/seed/dataS.csv' WITH DELIMITER AS ',' CSV HEADER;
\COPY tstockprices FROM './data/seed/dataT.csv' WITH DELIMITER AS ',' CSV HEADER;
\COPY ustockprices FROM './data/seed/dataU.csv' WITH DELIMITER AS ',' CSV HEADER;
\COPY vstockprices FROM './data/seed/dataV.csv' WITH DELIMITER AS ',' CSV HEADER;
\COPY wstockprices FROM './data/seed/dataW.csv' WITH DELIMITER AS ',' CSV HEADER;

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