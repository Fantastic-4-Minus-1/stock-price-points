/*  Create database called robinhood.
 *  Execute this file from the command line by typing:
 *    psql robinhood < schema.sql
 *  to create tables.*/

-- DROP DATABASE IF EXISTS robinhood;
-- CREATE DATABASE robinhood;

-- DROP TABLE IF EXISTS stockprices;
-- DROP TABLE IF EXISTS stockdistribution;

-- CREATE TABLE stockprices (
--   companyabbriev CHAR(5) NOT NULL,
--   company VARCHAR(40) NOT NULL,
--   stockspurchased INT NOT NULL,
--   yearhigh DECIMAL NOT NULL,
--   yearlow DECIMAL NOT NULL,
--   yearavg DECIMAL NOT NULL,
--   currentprice DECIMAL NOT NULL,
--   distributionid SERIAL,
--   PRIMARY KEY (companyabbriev)
-- );

-- CREATE TABLE stockdistribution (
--   id INT NOT NULL,
--   divindex SMALLINT NOT NULL,
--   divaverage DECIMAL NOT NULL,
--   divstockspurchased INT NOT NULL
-- );

-- \COPY stockprices FROM './data/seed/dataA-E.csv' WITH DELIMITER AS '|' CSV HEADER;
-- \COPY stockprices FROM './data/seed/dataF-J.csv' WITH DELIMITER AS '|' CSV HEADER;
-- \COPY stockprices FROM './data/seed/dataK-O.csv' WITH DELIMITER AS '|' CSV HEADER;
-- \COPY stockprices FROM './data/seed/dataP-T.csv' WITH DELIMITER AS '|' CSV HEADER;
-- \COPY stockprices FROM './data/seed/dataU-V.csv' WITH DELIMITER AS '|' CSV HEADER;

\COPY stockdistribution FROM './data/seed/dataDistA-E.csv' WITH DELIMITER AS '|' CSV HEADER;
\COPY stockdistribution FROM './data/seed/dataDistF-J.csv' WITH DELIMITER AS '|' CSV HEADER;
\COPY stockdistribution FROM './data/seed/dataDistK-O.csv' WITH DELIMITER AS '|' CSV HEADER;
\COPY stockdistribution FROM './data/seed/dataDistP-T.csv' WITH DELIMITER AS '|' CSV HEADER;
\COPY stockdistribution FROM './data/seed/dataDistU-V.csv' WITH DELIMITER AS '|' CSV HEADER;

-- CREATE INDEX id ON stockprices USING hash (companyabbriev);
CREATE INDEX distid ON stockdistribution (id);

GRANT ALL PRIVILEGES ON TABLE stockprices TO jenn;
GRANT ALL PRIVILEGES ON TABLE stockdistribution TO jenn;

-- INSERT INTO stockprices (companyabbriev, company, weeks, yearly, currentprice) VALUES ('AAAAA', 'A A', '{}', '{}'. '[]');