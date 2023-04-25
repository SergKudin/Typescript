import { dbCollection } from "./data.servise.js";
import sqlFile from "./file.service.js";
import { sql } from "./query.servise.js";

export async function incrementIspgBooks(id: number): Promise<number> {
  let countReadPage = await sql.getIspgBooks(id);
  countReadPage += 1;
  dbCollection.query(await sqlFile.getQuery('setReadPageBook'), [countReadPage, id]);
  countReadPage = await sql.getIspgBooks(id);
  return countReadPage;
}
