------------------------------------------------------
-- Centro : Cesur Sevilla
-- Descripción : Create Database Script Insultle.es
-- Autor : Fernando Pérez Nieto
-- Autor : Jonatan Carrera Viera
------------------------------------------------------

--CREATE DATABASE
CREATE DATABASE INSULTLE

--USE DATABASE
USE INSULTLE

--DROP DATABASE
IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'INSULTLE')
BEGIN
CREATE DATABASE INSULTLE
END

--DROP TABLES

--CREATE TABLES
--CREATE TABLE USERS
CREATE TABLE users (
	idUser	INT IDENTITY(1,1) NOT NULL,
	userCookie VARCHAR(100) NOT NULL

	CONSTRAINT PK_USERS PRIMARY KEY (idUser)
)
--CREATE TABLE INSULTS
CREATE TABLE insults (
	idInsult	INT IDENTITY(1,1) NOT NULL,
	insult	VARCHAR(100) NOT NULL

	CONSTRAINT PK_INSULTS PRIMARY KEY (idInsult)
)
--CREATE TABLE HISTORIC
CREATE TABLE historic (
	idDate	INT IDENTITY(1,1) NOT NULL,
	idInsult INT NOT NULL,
	publishDate	VARCHAR(100) NOT NULL

	CONSTRAINT PK_DATES PRIMARY KEY (idDate),
	CONSTRAINT FK_INSULTS FOREIGN KEY (idInsult) REFERENCES insults(idInsult)
)
--CREATE TABLE INSULTUSER
CREATE TABLE insultUser (
	idInsult	INT NOT NULL,
	idUser	INT NOT NULL,
	attempt INT NULL

	CONSTRAINT FK_INSULTS01 FOREIGN KEY (idInsult) REFERENCES insults(idInsult),
	CONSTRAINT FK_USERS FOREIGN KEY (idUser) REFERENCES users(idUser),
	CONSTRAINT PK_INSULTUSER PRIMARY KEY (idInsult,idUser)
)
--CREATE TABLE DICTIONARY
CREATE TABLE dictionary (
	idWord INT IDENTITY(1,1) NOT NULL,
	word VARCHAR(100) NOT NULL

	CONSTRAINT PK_DICTIONARY PRIMARY KEY (idWord,word)
)