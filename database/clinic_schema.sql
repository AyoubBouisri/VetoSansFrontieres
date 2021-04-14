SET search_path = bdschema;

DROP SCHEMA IF EXISTS bdschema CASCADE;
CREATE SCHEMA bdschema;

CREATE TABLE IF NOT EXISTS bdschema.Clinique(
	noClinique VARCHAR(5) NOT NULL,
	nom VARCHAR(50) NOT NULL,
	rue VARCHAR(20) NOT NULL,
	ville VARCHAR(20) NOT NULL,
	province VARCHAR(20) NOT NULL,
	codePostal VARCHAR(20) NOT NULL,
	noTel VARCHAR(20) NOT NULL,
	noFax VARCHAR(20) NOT NULL,
	noGestionnaire INTEGER,
	PRIMARY KEY (noClinique));
	
CREATE TABLE IF NOT EXISTS bdschema.Employe(
	noPersonnel INTEGER NOT NULL,
	nom VARCHAR(20) NOT NULL,
	prenom VARCHAR(20) NOT NULL,
	adresse VARCHAR(50) NOT NULL,
	noTel VARCHAR(20) NOT NULL,
	dateNaissance DATE NOT NULL,
	sexe CHAR NOT NULL CHECK( sexe IN('M', 'F')),
	NAS VARCHAR(20) NOT NULL,
	fonction VARCHAR(20) NOT NULL,
	salaireAnnuel MONEY NOT NULL,
	noClinique VARCHAR(50) NOT NULL,
	PRIMARY KEY(noPersonnel),
	FOREIGN KEY (noClinique) REFERENCES Clinique(noClinique) ON UPDATE CASCADE ON DELETE CASCADE);
	
ALTER TABLE Clinique
  ADD FOREIGN KEY (noGestionnaire) REFERENCES Employe(noPersonnel);
	
CREATE TABLE IF NOT EXISTS bdschema.Proprietaire(
	noProprietaire INTEGER NOT NULL,
	nom VARCHAR(20) NOT NULL,
	adresse VARCHAR(50) NOT NULL,
	noTel VARCHAR(20) NOT NULL,
	PRIMARY KEY (noProprietaire));
	
CREATE TABLE IF NOT EXISTS bdschema.CliniqueProprietaire(
	noClinique VARCHAR(5) NOT NULL,
	noProprietaire INTEGER NOT NULL,
	PRIMARY KEY (noClinique, noProprietaire),
	FOREIGN KEY (noClinique) REFERENCES Clinique(noClinique) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (noProprietaire) REFERENCES Proprietaire(noProprietaire) ON UPDATE CASCADE ON DELETE CASCADE);
	
	
CREATE TABLE IF NOT EXISTS bdschema.Animal(
	noAnimal INTEGER NOT NULL,
	nom VARCHAR(20) NOT NULL,
	typeAnimal VARCHAR(20) NOT NULL,
	espece VARCHAR(20) NOT NULL,
	taille NUMERIC(5,2) NOT NULL,
	poids NUMERIC(5,2) NOT NULL,
	description VARCHAR(100) NOT NULL,
	dateNaissance DATE NOT NULL,
	dateInscription DATE NOT NULL,
	etatActuel VARCHAR(20) NOT NULL CHECK( etatActuel IN('vivant', 'decede')),
	noProprietaire INTEGER,
	PRIMARY KEY (noAnimal),
	FOREIGN KEY (noProprietaire) REFERENCES Proprietaire(noProprietaire) ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS bdschema.Facture(
	noFacture INTEGER NOT NULL,
	dateFacture DATE NOT NULL,
	montant MONEY NOT NULL,
	etat VARCHAR(20) NOT NULL CHECK (etat IN('payee', 'non-payee')),
	modePaiement VARCHAR(20) NOT NULL CHECK (modePaiement IN('carte de credit', 'comptant', 'cheque')),
	noAnimal INTEGER NOT NULL,
	PRIMARY KEY (noFacture),
	FOREIGN KEY (noAnimal) REFERENCES Animal(noAnimal) ON UPDATE CASCADE ON DELETE CASCADE);
	
CREATE TABLE IF NOT EXISTS bdschema.Examen(
	noTraitement INTEGER NOT NULL,
	dateExamen DATE NOT NULL,
	heure TIME NOT NULL,
	description VARCHAR(100) NOT NULL,
	descriptionResultats VARCHAR(100) NOT NULL,
	noVeterinaire INTEGER NOT NULL,
	cout MONEY NOT NULL,
	noFacture INTEGER NOT NULL,
	noAnimal INTEGER NOT NULL,
	PRIMARY KEY (noTraitement),
	FOREIGN KEY (noVeterinaire) REFERENCES Employe(noPersonnel) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (noFacture) REFERENCES Facture(noFacture) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (noAnimal) REFERENCES Animal(noAnimal) ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS bdschema.TraitementMedical(
	noTraitement INTEGER NOT NULL,
	quantite INTEGER NOT NULL,
	dateDebut DATE NOT NULL,
	dateFin DATE NOT NULL,
	noExamen INTEGER NOT NULL,
	description VARCHAR(100) NOT NULL,
	cout MONEY NOT NULL,
	noFacture INTEGER NOT NULL,
	noVeterinaire INTEGER NOT NULL,
	PRIMARY KEY (noTraitement),
	FOREIGN KEY (noExamen) REFERENCES Examen(noTraitement) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (noFacture) REFERENCES Facture(noFacture) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (noVeterinaire) REFERENCES Employe(noPersonnel) ON UPDATE CASCADE ON DELETE CASCADE);
	
	
	