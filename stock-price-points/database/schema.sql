/*  Create database called robinhood.
 *  Execute this file from the command line by typing:
 *    psql robinhood < schema.sql
 *  to create tables.*/

-- DROP DATABASE IF EXISTS robinhood;
-- CREATE DATABASE robinhood;

DROP TABLE IF EXISTS stockprices;
DROP TABLE IF EXISTS stocksweekly;

CREATE TABLE stockprices (
  companyabbriev CHAR(5) NOT NULL,
  company VARCHAR(40) NOT NULL,
  stockspurchased INT NOT NULL,
  yearhigh MONEY NOT NULL,
  yearlow MONEY NOT NULL,
  yearavg MONEY NOT NULL,
  currentprice MONEY NOT NULL,
  weekid INT NOT NULL,
  PRIMARY KEY (companyabbriev)
);

CREATE TABLE stocksweekly (
  id INT NOT NULL,
  weekindex SMALLINT NOT NULL,
  weekaverage MONEY NOT NULL,
  weekstockspurchased INT NOT NULL
);

-- CREATE TABLE stocksweekly2m PARTITION OF stocksweekly
--     FOR VALUES FROM (0) TO (2000000);

-- CREATE TABLE stocksweekly4m PARTITION OF stocksweekly
--     FOR VALUES FROM (2000000) TO (4000000);

-- CREATE TABLE stocksweekly6m PARTITION OF stocksweekly
--     FOR VALUES FROM (4000000) TO (6000000);

-- CREATE TABLE stocksweekly8m PARTITION OF stocksweekly
--     FOR VALUES FROM (6000000) TO (8000000);

-- CREATE TABLE stocksweekly10m PARTITION OF stocksweekly
--     FOR VALUES FROM (8000000) TO (10000000);

-- CREATE TABLE stocksweekly12m PARTITION OF stocksweekly
--     FOR VALUES FROM (10000000) TO (12000000);

\COPY stockprices FROM './data/seed/dataA-E.csv' WITH DELIMITER AS '|' CSV HEADER;
\COPY stockprices FROM './data/seed/dataF-J.csv' WITH DELIMITER AS '|' CSV HEADER;
\COPY stockprices FROM './data/seed/dataK-O.csv' WITH DELIMITER AS '|' CSV HEADER;
\COPY stockprices FROM './data/seed/dataP-T.csv' WITH DELIMITER AS '|' CSV HEADER;
\COPY stockprices FROM './data/seed/dataU-V.csv' WITH DELIMITER AS '|' CSV HEADER;

\COPY stocksweekly FROM './data/seed/dataWeekA-E.csv' WITH DELIMITER AS '|' CSV HEADER;
\COPY stocksweekly FROM './data/seed/dataWeekF-J.csv' WITH DELIMITER AS '|' CSV HEADER;
\COPY stocksweekly FROM './data/seed/dataWeekK-O.csv' WITH DELIMITER AS '|' CSV HEADER;
\COPY stocksweekly FROM './data/seed/dataWeekP-T.csv' WITH DELIMITER AS '|' CSV HEADER;
\COPY stocksweekly FROM './data/seed/dataWeekU-V.csv' WITH DELIMITER AS '|' CSV HEADER;

CREATE INDEX id ON stockprices USING hash (companyabbriev);
CREATE INDEX weekid ON stocksweekly (id);

-- CREATE INDEX ON stocksweekly2m USING hash (id);
-- CREATE INDEX ON stocksweekly4m USING hash (id);
-- CREATE INDEX ON stocksweekly6m USING hash (id);
-- CREATE INDEX ON stocksweekly8m USING hash (id);
-- CREATE INDEX ON stocksweekly10m USING hash (id);
-- CREATE INDEX ON stocksweekly12m USING hash (id);

GRANT ALL PRIVILEGES ON TABLE stockprices TO jenn;
GRANT ALL PRIVILEGES ON TABLE stocksweekly TO jenn;

-- INSERT INTO stockprices (companyabbriev, company, weeks, yearly, currentprice) VALUES ('AAAAA', 'A A', '{}', '{}'. '[]');