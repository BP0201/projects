\echo 'Delete and recreate getflix db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE getflix;
CREATE DATABASE getflix;
\connect getflix

\i tables.sql

\echo 'Delete and recreate getflix_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE getflix_test;
CREATE DATABASE getflix_test;
\connect getflix_test

\i tables.sql