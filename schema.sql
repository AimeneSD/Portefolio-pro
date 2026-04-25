-- =============================================
-- Schema MySQL pour Portefolio-pro
-- À exécuter dans phpMyAdmin ou via CLI MySQL
-- =============================================

CREATE DATABASE IF NOT EXISTS portefolio
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portefolio;

CREATE TABLE IF NOT EXISTS projets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    categorie VARCHAR(50),
    technos VARCHAR(255),
    lien VARCHAR(500),
    image VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
