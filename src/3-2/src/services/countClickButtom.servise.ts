import { dbCollection } from "./data.servise.js";
import sqlFile from "./file.service.js";
import { sql } from "./query.servise.js";

export async function incrementIsbnBooks(id: number): Promise<number> {
  let clickButtom = await sql.getIsbnBooks(id);
  clickButtom += 1;
  dbCollection.query(await sqlFile.getQuery('setClickButtom'), [clickButtom, id]);
  clickButtom = await sql.getIsbnBooks(id);
  return clickButtom;
}
