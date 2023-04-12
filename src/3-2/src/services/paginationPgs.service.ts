import { dbCollection } from "./data.servise.js";
import sqlFile from "./file.service.js";

const numBooksPagesMin: number = 10;
let numBooksPages: number = numBooksPagesMin;
let numBooksPagesMax: number = numBooksPagesMin;

async function getElementsBooks() {
  const [nBooks, fieldsAutors] = await dbCollection.query(await sqlFile.getQuery('countBooks'));
  const countBooks = nBooks as Array<{ 'nBook': number }>;
  numBooksPagesMax = countBooks[0].nBook;
}

export async function addElementsBooks() {
  await getElementsBooks();
  numBooksPages = (numBooksPages + numBooksPagesMin) > numBooksPagesMax ? numBooksPagesMax : numBooksPages + numBooksPagesMin;
}

export async function removeElementsBooks() {
  numBooksPages = (numBooksPages - numBooksPagesMin) < numBooksPagesMin ? numBooksPagesMin : numBooksPages - numBooksPagesMin;
}

export function getElementsBooksInPages(): number { return numBooksPages };
export function getMinElementsBooksInPages(): number { return numBooksPagesMin };
export async function getMaxElementsBooksInPages(): Promise<number> {
  await getElementsBooks();
  return numBooksPagesMax
};