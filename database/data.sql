SET search_path = bdschema;

INSERT INTO Clinique VALUES ('C01', 'Vet', '2nd avenue', 'Montreal', 'Quebec', 'H0H 0H0', '514-123-4567', '514-123-1212'), ('C02', 'Clini-Vet','3rd avenue', 'Montreal', 'Quebec', 'H0H 0H0', '514-123-4568', '514-123-1213') ;

INSERT INTO Employe VALUES (1, 'Smith', 'John', '123 Churchill, Mtl', '514-250-1111', '1955-11-02', 'M', '123 456 789', 'Gestionnaire', '80000', 'C01'),							
(2, 'Roy', 'Elise', '1010 Bordeaux, Mtl', '514-250-2222', '1962-01-01', 'F', '123 456 780', 'Gestionnaire', '80000','C02'),
(3, 'Vujac', 'Dan', '5210 James, Mtl', '514-250-5555', '1942-07-01', 'M', '123 456 783', 'Personnel entretien', '40000', 'C01'),
(4, 'Watson', 'Amy', '321 Ste-Catherine, Mtl', '514-250-6666', '1985-09-06', 'F', '123 456 784', 'Secretaire', '60000', 'C01'),
(5, 'Lee', 'James', '210 St-Laurent, Mtl', '514-250-3333', '1970-03-01', 'M', '123 456 781', 'Veterinaire', '100000', 'C01'),
(6, 'Peterson', 'Karen', '9802 5th Avenue, Mtl', '514-250-4444', '1972-05-12', 'F', '123 456 782', 'Veterinaire', '100000', 'C02'),
(7, 'Tremblay', 'Jean', '888 Cartier, Mtl', '514-984-2390', '1955-03-03', 'M', '900 900 900', 'Veterinaire', '100000', 'C01'),
(8, 'Dube', 'Marc', '6789 Levesque, Mtl', '514-321-2222', '1952-12-01', 'M', '123 456 789', 'Secretaire', '65000','C02');

UPDATE Clinique SET noGestionnaire=1 WHERE noClinique = 'C01';
UPDATE Clinique SET noGestionnaire=2 WHERE noClinique = 'C02';

INSERT INTO Animal VALUES (1, 'Lucky', 'Chien', 'Husky', '60', '40', 'Poils noirs, gris et blancs, yeux bleus', '2010-10-03', '2020-05-05', 'vivant'),
(2, 'Pablo', 'Chien', 'Pomeranian', '20', '5', 'Poils bruns, yeux noirs', '2019-12-20', '2021-01-19', 'vivant'),
(3, 'Maya', 'Chien', 'Samoyed', '40', '21', 'Poils blancs, yeux noirs', '2021-01-10', '2021-03-25','vivant'),
(4, 'Pluton', 'Chat', 'Siamois', '10', '7', 'Poils blancs, yeux verts', '2021-02-20', '2021-03-26', 'vivant'),
(5, 'Mowgli', 'Chat', 'Persian', '15', '7', 'Poils noirs, yeux verts', '2020-04-30', '2021-03-26', 'vivant'),
(6, 'Caramel', 'Hamster', 'Golden', '5', '1', 'Poils bruns, yeux noirs', '2018-06-19', '2021-03-21', 'vivant'),
(7, 'Michiko', 'Chien', 'Shiba Inu', '25', '15', 'Poils blancs et noirs, yeux noirs', '2019-05-17', '2021-02-25','vivant'),
(8, 'Jack', 'Chien', 'Bulldog', '12', '10', 'Poils beiges', '2021-02-13', '2021-04-10','vivant'),
(9, 'Lynx', 'Chat', 'British', '8', '6', 'Poils gris, yeux verts', '2021-02-20', '2021-03-26', 'vivant');


INSERT INTO Proprietaire VALUES (1, 'Ayoub Bouisri', '101 Montagne, Mtl', '514-656-8888'),
(2, 'Patricia Gomez', '2031 Charles, Mtl', '514-920-2097'),
(3, 'Jules Tremblay', '2004 Elizabeth, Mtl', '514-890-3291'),
(4, 'Claude Tremblay', '6709 Georges, Mtl', '514-777-0909'),
(5, 'Ayoub Bouisri', '101 Montagne, Mtl', '514-656-8888'),
(6, 'Paul Jackson', '1234 Pierre-Gravel, Mtl', '514-322-8901');

UPDATE Animal SET noProprietaire=1 WHERE noAnimal=1;
UPDATE Animal SET noProprietaire=2 WHERE noAnimal=2;
UPDATE Animal SET noProprietaire=3 WHERE noAnimal=3;
UPDATE Animal SET noProprietaire=4 WHERE noAnimal=4;
UPDATE Animal SET noProprietaire=5 WHERE noAnimal=5;
UPDATE Animal SET noProprietaire=6 WHERE noAnimal=6;
UPDATE Animal SET noProprietaire=6 WHERE noAnimal=7;
UPDATE Animal SET noProprietaire=4 WHERE noAnimal=8;
UPDATE Animal SET noProprietaire=2 WHERE noAnimal=9;

INSERT INTO Facture VALUES (1, '2021-02-17', '0', 'payee', 'carte de credit', 1),
(2, '2021-01-10', '0', 'payee', 'carte de credit', 2),
(3, '2021-02-17', '0', 'payee', 'cheque', 3),
(4, '2020-10-20', '0', 'payee', 'comptant', 1),
(5, '2021-02-09', '0', 'payee', 'comptant', 7),
(6, '2021-02-11', '0', 'payee', 'comptant', 4),
(7, '2021-01-11', '0', 'payee', 'carte de credit', 5),
(8, '2020-12-09', '0', 'payee', 'carte de credit', 6),
(9, '2021-02-02', '0', 'payee', 'carte de credit', 8),
(10, '2020-12-23', '0', 'payee', 'carte de credit', 9);

INSERT INTO Examen VALUES (1, '2020-10-20', '15:00', 'Examen annuel', 'Immunologie reduite', 5, '20', 1, 1),
(2, '2021-02-17', '14:00', 'Rayon-X', 'Fracture', 5, '20', 2, 1),
(3, '2021-01-10', '10:00', 'Examen annuel', 'Aucun probleme', 6, '20', 3, 2),
(4, '2021-02-17', '14:00', 'Rayon-X', 'Aucun probleme', 6, '20', 4, 3),
(10, '2021-02-11', '13:00', 'Examen annuel', 'Aucun probleme', 6, '20', 6, 4),
(11, '2021-01-11', '11:00', 'Examen annuel', 'Aucun probleme', 6, '20', 7, 5),
(12, '2021-12-09', '10:00', 'Examen annuel', 'Aucun probleme', 5, '20', 8, 6),
(13, '2021-02-02', '11:00', 'Examen annuel', 'Aucun probleme', 6, '20', 9, 8),
(14, '2020-12-23', '10:00', 'Examen annuel', 'Aucun probleme', 6, '20', 10, 9),
(9, '2021-02-09', '9:00', 'Examen annuel', 'Manque nutriments', 5, '20', 5, 7);

INSERT INTO TraitementMedical VALUES (5, 1, '2020-10-20', '2020-10-20', 1, 'vaccin grippe', '40', 1, 5),
(7, 1, '2020-10-20', '2020-10-20', 1, 'vitamines', '60', 1, 5),
(8, 1, '2021-02-09', '2020-02-09', 9, 'vitamines', '60', 5, 5),
(6, 1, '2021-03-25', '2021-05-29', 2, 'Platre', '80', 2, 5);


--UPDATE Facture SET montant = sumbill
--FROM
--	(SELECT SUM(CASE WHEN f.noAnimal = e.noAnimal THEN 
--				e.cout + t.cout END) as sumbill
--	FROM Examen e, TraitementMedical t, Facture f
--	WHERE e.noFacture = t.noFacture AND
--	f.noAnimal = e.noAnimal
--	GROUP BY e.noAnimal) fac;

INSERT INTO CliniqueProprietaire VALUES ('C01', 1), ('C02', 2), ('C02', 3), ('C02', 5), ('C02', 4), ('C01', 6);
