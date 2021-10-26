# Projet n°7 OpenClassrooms
- Création d'un réseau social d'entreprise pour Groupomania
- Télécharger le repository et suivez les instructions ci-après pour installer ce projet en local

## Prérequis
- Installer Node.js. 
- Installer Vue.js. 
- Installer MySQL. 

## Base de données MySQL
- Ouvrez votre terminal. 
- Connectez-vous à MySQL : mysql -h localhost -u root -p. 
- Tapez votre mot de passe. 
- Créez la base de données : CREATE DATABASE groupomania CHARACTER SET 'utf8';  
- Utilisez la base de données créée : USE groupomania. 
- Importez le fichier groupomania_database.sql : SOURCE groupomania.sql;  
- Dans le dossier backend, allez dans le fichier connectdb.js et renseignez votre mot de passe dans password:'xxxxxx'. 

## Installation et démarrage du Backend
- Ouvrez votre terminal. 
- Allez dans le dossier backend : cd /backend. 
- Installez toutes les dépendances du projet : npm install. 
- Démarrez le serveur Node.js : npm run start. 

## Installation et démarrage du Frontend
- Ouvrez votre terminal. 
- Allez dans le dossier frontend : cd /frontend. 
- Installez toutes les dépendances du projet : npm install. 
- Démarrez l'application : npm run serve. 

## Testez l'application
Ouvrez votre navigateur et allez sur : http://localhost:8080/
