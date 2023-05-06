import { sql } from "./query.servise.js";

const numBooksPagesMin: number = +(process.env.NUMBER_OF_BOOKS_PER_PAGE || 10);

// const numBooksPagesMin: number = 10;
let numBooksPages: number = +(process.env.NUMBER_OF_BOOKS_PLUS_PAGE || 10);
let numBooksPagesMax: number = numBooksPagesMin;

async function getElementsBooks() {
  numBooksPagesMax = await sql.countBooks();
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