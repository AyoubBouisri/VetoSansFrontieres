SET search_path = bdschema;

--1) numéro et nom des cliniques, leur adresse et leur gestionnaire, ordonnés par le
--numéro de clinique
SELECT noClinique, nom, rue, ville, province, codePostal, noGestionnaire
FROM Clinique	
ORDER BY noClinique;

--2) noms des employés de plus de 40 ans ordonnés par nom
SELECT noPersonnel, nom, prenom
FROM
	(SELECT EXTRACT(YEAR from AGE(dateNaissance)) as Age, 
	* FROM Employe) ageEmploye
WHERE Age > 40
ORDER BY nom;

--3) noms des animaux dans toutes les cliniques ainsi que le nombre de fois où ils
--apparaissent. Par exemple Charlie, 3
SELECT nom, COUNT(noClinique) as recur
FROM
	(SELECT a.nom, a.noProprietaire, c.noClinique
	FROM Animal a, CliniqueProprietaire c
	WHERE a.noProprietaire = c.noProprietaire) clinproprio
GROUP BY nom
ORDER BY nom;


--4) Lister les numéros et noms des propriétaires d’animaux ainsi que les détails de leurs animaux
--dans une clinique donnée au choix
SELECT DISTINCT p.nom, a.*, c.noClinique
FROM Proprietaire p, Animal a, CliniqueProprietaire c
WHERE p.noProprietaire = a.noProprietaire AND p.noProprietaire = c.noProprietaire AND
c.noClinique = 'C01'
ORDER BY noProprietaire;


--5) Lister l’ensemble des examens d’un animal donné en utilisant sa clé primaire
SELECT DISTINCT e.* 
FROM Examen e, Animal a
WHERE e.noAnimal = a.noAnimal
ORDER BY noAnimal;

--6) Lister le détail des traitements d’un animal suite à un examen donné
SELECT t.*
FROM Examen e, Animal a, TraitementMedical t
WHERE e.noAnimal = a.noAnimal AND 
 e.noTraitement = t.noExamen
ORDER BY e.noTraitement;

--7) Lister le salaire total des employés par clinique ordonné par numéro de clinique
SELECT noClinique, SUM(salaireAnnuel) as salaireAnnuelTotal
FROM Employe
GROUP BY noClinique
ORDER BY noClinique;

--8) Lister le nombre total d’animaux par type dans chaque clinique. Par exemple : C1, chat, 40.
SELECT noClinique, typeAnimal, COUNT(typeAnimal)
FROM
	(SELECT a.typeAnimal as typeAnimal, c.noClinique as noClinique
	FROM Animal a, CliniqueProprietaire c
	WHERE a.noProprietaire = c.noProprietaire) countType
GROUP BY noClinique, typeAnimal;


--9) Lister le coût minimum, maximum et moyen des traitements
SELECT MAX(cout), MIN(cout), AVG(cout::money::numeric::float8) as AvgCost
FROM
	((SELECT cout 
	FROM TraitementMedical)
	UNION
	(SELECT cout
	FROM Examen)) costs;
	
--10) Quels sont les propriétaires dont le nom contient « blay » ?
SELECT noProprietaire, nom
FROM Proprietaire
WHERE nom iLIKE '%blay%';

--11) Supprimez le vétérinaire « Jean Tremblay » qui travaille dans la clinique dont
--l’identificateur est C01.
DELETE FROM Employe
WHERE fonction iLIKE 'veterinaire' AND prenom = 'Jean' AND
nom = 'Tremblay' AND noClinique = 'C01';

--12) Lister les détails des propriétaires qui ont un chat et un chien
SELECT DISTINCT nom, adresse, notel
FROM Proprietaire
WHERE nom IN
	((SELECT p.nom
	FROM Proprietaire p, Animal a, CliniqueProprietaire c
	WHERE p.noProprietaire = a.noProprietaire AND p.noProprietaire = c.noProprietaire AND
	typeAnimal iLIKE 'chat')
	INTERSECT
	(SELECT p.nom
	FROM Proprietaire p, Animal a, CliniqueProprietaire c
	WHERE p.noProprietaire = a.noProprietaire AND p.noProprietaire = c.noProprietaire AND
	typeAnimal iLIKE 'chien'));
	
--13) Lister les détails des propriétaires qui ont un chat ou un chien
SELECT DISTINCT nom, adresse, notel
FROM Proprietaire
WHERE nom IN
	((SELECT p.nom
	FROM Proprietaire p, Animal a, CliniqueProprietaire c
	WHERE p.noProprietaire = a.noProprietaire AND p.noProprietaire = c.noProprietaire AND
	typeAnimal iLIKE 'chat')
	UNION
	(SELECT p.nom
	FROM Proprietaire p, Animal a, CliniqueProprietaire c
	WHERE p.noProprietaire = a.noProprietaire AND p.noProprietaire = c.noProprietaire AND
	typeAnimal iLIKE 'chien'));
	
--14) Lister les détails des propriétaires qui ont un chat mais pas de chien vacciné contre la grippe
--(la condition vacciné contre la grippe ne s’applique qu’aux chiens)

	(SELECT p.nom, p.adresse, p.notel
	FROM Proprietaire p, Animal a, CliniqueProprietaire c
	WHERE p.noProprietaire = a.noProprietaire AND p.noProprietaire = c.noProprietaire AND
	typeAnimal iLIKE 'chat')
	EXCEPT
	(SELECT nom, adresse, notel
	FROM Proprietaire 
	WHERE noProprietaire IN
				(SELECT a.noProprietaire
				FROM TraitementMedical t, Examen e, Animal a
				WHERE t.description iLIKE 'vaccin grippe' AND
				t.noExamen = e.noTraitement AND 
				e.noAnimal = a.noAnimal));
				
--15) Lister tous les animaux d’une clinique donnée avec leurs traitements s’ils existent. Dans le
--cas contraire, affichez null.
SELECT DISTINCT t.*, e.noVeterinaire as examvet, e.dateExamen, e.heure, e.description as descexam, e.descriptionResultats,
e.cout as coutexam, e.noAnimal
FROM Animal a, CliniqueProprietaire c, Examen e LEFT JOIN TraitementMedical t ON 
e.noTraitement = t.noExamen
WHERE e.noAnimal = a.noAnimal AND
a.noProprietaire = c.noProprietaire AND 
c.noClinique = 'C01' AND
a.noAnimal IN
	(SELECT noAnimal
	 FROM Animal
	 WHERE EXISTS
		(SELECT noTraitement
		FROM Examen));



