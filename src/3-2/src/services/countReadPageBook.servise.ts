import { dbCollection } from "./data.servise.js";
import sqlFile from "./file.service.js";

export async function getIspgBooks(id: number): Promise<number> {
  const [booksPgsClick, fields] = await dbCollection.query(await sqlFile.getQuery('getReadPageBook'), id);
  const countReadPage = booksPgsClick as Array<{ 'booksPgsClick': number }> || 0;
  return countReadPage[0].booksPgsClick;
}

export async function incrementIspgBooks(id: number): Promise<number> {
  let countReadPage = await getIspgBooks(id);
  countReadPage += 1;
  dbCollection.query(await sqlFile.getQuery('setReadPageBook'), [countReadPage, id]);
  countReadPage = await getIspgBooks(id);
  return countReadPage;
}
