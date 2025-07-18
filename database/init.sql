CREATE DATABASE IF NOT EXISTS ticket_db;

USE ticket_db;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50)
);

INSERT INTO users (name) VALUES ('Alice'), ('Bob');

SELECT * FROM users;
