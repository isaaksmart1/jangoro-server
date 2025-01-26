-- SQLite
-- DELETE FROM User WHERE email = 'isaaksmart@uea.ac.uk'
DROP TABLE IF EXISTS _prisma_migrations;
DELETE FROM BetaList;
DELETE FROM Note;
DELETE FROM Payments;
DELETE FROM User;
