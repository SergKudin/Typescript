import { dbCollection } from "./data.servise.js";
import sqlFile from "./file.service.js";

export async function getIsbnBooks(id: number): Promise<number> {
  const [booksBtnClick, fields] = await dbCollection.query(await sqlFile.getQuery('getClickButtom'), id);
  const clickButtom = booksBtnClick as Array<{ 'booksBtnClick': number }> || 0;
  return clickButtom[0].booksBtnClick;
}

export async function incrementIsbnBooks(id: number): Promise<number> {
  let clickButtom = await getIsbnBooks(id);
  clickButtom += 1;
  dbCollection.query(await sqlFile.getQuery('setClickButtom'), [clickButtom, id]);
  clickButtom = await getIsbnBooks(id);
  return clickButtom;
}
