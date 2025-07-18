CREATE DATABASE IF NOT EXISTS ticket_db;

USE ticket_db;

CREATE TABLE IF NOT EXISTS LavoratoDa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS TipoINC (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS GruppoInoltro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gruppo VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Ticket (
    numero_ticket VARCHAR(20) PRIMARY KEY,
    data_creazione DATE NOT NULL,
    data_lavorazione DATE,
    lavorato_da_id INT,
    priorita INT NOT NULL,
    tipo_inc_id INT,
    gruppo_inoltro_id INT,
    stato VARCHAR(50) NOT NULL,
    note TEXT,
    FOREIGN KEY (lavorato_da_id) REFERENCES LavoratoDa(id),
    FOREIGN KEY (tipo_inc_id) REFERENCES TipoINC(id),
    FOREIGN KEY (gruppo_inoltro_id) REFERENCES GruppoInoltro(id)
);

INSERT IGNORE INTO LavoratoDa (nome) VALUES 
    ('Papalia Luigi'), 
    ('Pagani Jacopo');

INSERT IGNORE INTO TipoINC (tipo) VALUES 
    ('Automatismi'), 
    ('Canale 1'),
    ('Canale 2'), 
    ('Sonde');

INSERT IGNORE INTO GruppoInoltro (gruppo) VALUES 
    ('Gruppo mistico 1'), 
    ('Gruppo mistico 2'), 
    ('Gruppo mistico 3');
