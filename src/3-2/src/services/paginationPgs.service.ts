import { sql } from "./query.servise.js";
const numBooksPagesMin: number = +(process.env.NUMBER_OF_BOOKS_PER_PAGE || 10);

// export class PageBooksPagination {

//   numBooksPages: number;
//   numBooksPagesMax: number;

//   constructor() {
//     this.numBooksPages = numBooksPagesMin;
//     this.numBooksPagesMax = numBooksPagesMin;
//   }

//   async getElementsBooks() {
//     this.numBooksPagesMax = await sql.countBooks();
//   }

//   async addElementsBooks() {
//     await this.getElementsBooks();
//     this.numBooksPages = (this.numBooksPages + numBooksPagesMin) > this.numBooksPagesMax ?
//       this.numBooksPagesMax : this.numBooksPages + numBooksPagesMin;
//   }

//   async removeElementsBooks() {
//     this.numBooksPages = (this.numBooksPages - numBooksPagesMin) < numBooksPagesMin ?
//       numBooksPagesMin : this.numBooksPages - numBooksPagesMin;
//   }

//   getElementsBooksInPages(): number { return this.numBooksPages };

//   getMinElementsBooksInPages(): number { return numBooksPagesMin };

//   async getMaxElementsBooksInPages(): Promise<number> {
//     await this.getElementsBooks();
//     return this.numBooksPagesMax;
//   };
// }



// const numBooksPagesMin: number = 10;
let numBooksPages: number = numBooksPagesMin;
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