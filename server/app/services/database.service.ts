import { injectable } from "inversify";
import * as pg from "pg";
import { animal } from "../../../common/tables/animal";

@injectable()
export class DatabaseService {

  // TODO: A MODIFIER POUR VOTRE BD
  public connectionConfig: pg.ConnectionConfig = {
    user:"postgres",
    password:"u1l1fpua",
    host:"localhost",
    port:5432,
    database:"clinicbd"
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM HOTELDB.${tableName};`);
    client.release()
    return res;
  }


  public async getAllCliniques(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let queryText = "SELECT * FROM bdschema.clinique;"
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  // get the hotel names and numbers so so that the user can only select an existing hotel
  public async getCliniqueByNo(cliniqueNo : string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM bdschema.clinique WHERE noClinique = '${cliniqueNo}';`);
    client.release()
    return res;
  }

  public async getAllAnimalsFromClinique(cliniqueNo : string) : Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText = `SELECT a.*, p.nom as nomProprietaire FROM bdschema.cliniqueproprietaire c, bdschema.animal a, bdschema.proprietaire p WHERE (c.noProprietaire=a.noProprietaire AND a.noProprietaire=p.noProprietaire AND noClinique='${cliniqueNo}') ORDER BY a.nom;`
    const res = await client.query(queryText);
    client.release()
    return res;
  }

  public async getAnimalsFromQuery(noClinique: string, searchQuery:string ) : Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText = `
    SELECT a.* 
    FROM bdschema.animal a, bdschema.cliniqueproprietaire c, bdschema.proprietaire p
    WHERE (c.noProprietaire=a.noProprietaire AND a.noProprietaire=p.noProprietaire AND noClinique='${noClinique}') AND (CAST(noAnimal AS TEXT) LIKE '%${searchQuery}' OR a.nom iLIKE '%${searchQuery}%')  ORDER BY a.nom;
      `
    const res = await client.query(queryText);
    client.release()
    return res;
  }

  public async getAnimal(noAnimal:string) : Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText = `SELECT * FROM bdschema.animal WHERE noAnimal = ${noAnimal};`
    const res = await client.query(queryText);
    client.release()
    return res;
  }

  public async deleteAnimal(animalId: string) : Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText = `DELETE FROM bdschema.animal WHERE noAnimal = ${animalId};`
    const res = await client.query(queryText);
    client.release()
    return res;
  }

  public async addAnimal(animal : animal) : Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText = `INSERT INTO bdschema.animal VALUES ((SELECT MAX(noAnimal) FROM bdschema.animal) + 1, '${animal.nom}', '${animal.typeanimal}', '${animal.espece}', '${animal.taille}', '${animal.poids}', '${animal.description}', '${animal.datenaissance}', '${animal.dateinscription}', '${animal.etatactuel}', '${animal.noproprietaire}');`
    const res = await client.query(queryText);
    client.release()
    return res;
  }

  public async updateAnimal(animal: animal) : Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText = `UPDATE bdschema.animal SET nom = '${animal.nom}', typeanimal = '${animal.typeanimal}', espece = '${animal.espece}', taille = '${animal.taille}', poids = '${animal.poids}', description = '${animal.description}', datenaissance = '${animal.datenaissance}', dateinscription='${animal.dateinscription}', etatactuel='${animal.etatactuel}', noproprietaire='${animal.noproprietaire}' WHERE noanimal = ${animal.noanimal};`
    const res = await client.query(queryText);
    client.release()
    return res;
  }

  public async getFacture(noAnimal: string) : Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText = `SELECT * FROM bdschema.facture WHERE noanimal = ${noAnimal};`
    const res = await client.query(queryText);
    client.release()
    return res;
  }

  public async getProprietaires(noClinique: string) : Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText = `SELECT p.noproprietaire, p.nom FROM bdschema.cliniqueproprietaire c, bdschema.proprietaire p WHERE p.noproprietaire = c.noproprietaire AND c.noclinique = '${noClinique}';`
    const res = await client.query(queryText);
    client.release()
    return res;
  }


}
