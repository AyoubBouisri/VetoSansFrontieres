SET SEARCH_PATH = dbschema;

CREATE OR REPLACE FUNCTION keepHistory() RETURNS trigger AS $$
    BEGIN
       INSERT INTO historique VALUES(OLD.noTraitement, OLD.dateExamen,OLD.heure,
									OLD.description, OLD.descriptionResultats, 
									OLD.noVeterinaire, OLD.cout, OLD.noFacture,
									OLD.noAnimal);
       RETURN OLD;
    END;
$$ LANGUAGE plpgsql;

---Trigger qui se déclenche avant la suppression des données
DROP TRIGGER IF EXISTS deletingData on Examen;

CREATE TRIGGER deletingData
BEFORE DELETE ON Examen 
FOR EACH ROW 
EXECUTE PROCEDURE keepHistory();

DROP TRIGGER IF EXISTS deletingData2 on TraitementMedical;

CREATE TRIGGER deletingData2
BEFORE DELETE ON TraitementMedical
FOR EACH ROW 
EXECUTE PROCEDURE keepHistory();

