import { injectable } from "inversify";
import * as pg from "pg";

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
    const res = await client.query(`SELECT * FROM bdschema.clinique WHERE noClinique == '${cliniqueNo}';`);
    client.release()
    return res;
  }
}
