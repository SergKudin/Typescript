import Autor from "../models/autor.models.js";
import Book from "../models/book.models.js";
import { dbCollection } from "./data.servise.js";
import sqlFile from "./file.service.js";

const numBooksTableMin: number = 10;
let actualPagePagination: number = 0;
let numPagePagination: number = 1;

async function getIdBooks(): Promise<number[]> {  //
  const [booksId, fields] = await dbCollection.query(await sqlFile.getQuery('getAllIdBooks'));
  const arrObjId = booksId as Array<{ 'booksId': number }>;
  return arrObjId.map(item => { return item.booksId })
}

export async function getSubArrPagesPagination(): Promise<number[][]> {
  const arr: number[] = await getIdBooks();
  const nSubArr: number = ((arr.length - arr.length % numBooksTableMin) / numBooksTableMin) + 1;
  let subArr: number[][] = [];
  for (let i = 0; i < nSubArr; i++) {
    subArr[i] = arr.slice((i * numBooksTableMin), (i * numBooksTableMin) + numBooksTableMin);
  }
  numPagePagination = subArr.length;
  return subArr;
}

export async function setActPagePagination(actPage: number): Promise<number> {
  await getSubArrPagesPagination();
  actualPagePagination = ((actPage < 0) || (actPage > numPagePagination)) ? actualPagePagination : actPage;
  return actualPagePagination;
}

export async function getActPagePagination(): Promise<number> {
  return actualPagePagination;
}

export async function getNumPagePagination(): Promise<number> {
  await getSubArrPagesPagination();
  return numPagePagination;
}

async function getSubArrPage(): Promise<string> {
  const arr: number[][] = await getSubArrPagesPagination();
  return arr[actualPagePagination].join(', ')
}

export async function getSubArrPageBooks(): Promise<Book[]> {
  const arr: number[][] = await getSubArrPagesPagination();
  const [books, fieldsBooks] = await dbCollection.query(((await sqlFile.getQuery('booksWhereIdIn')).replace('?', await getSubArrPage())));
  const [autors, fieldsAutors] = await dbCollection.query(await sqlFile.getQuery('allAutors'));
  const b = books as Book[];
  const a = autors as Autor[];
  for (let book of b) {
    book.autors = [];
    a.filter(autor => autor.booksId === book.booksId)
      .forEach((autor, i) => book.autors[i] = autor.autorsName);
  }
  return b;
}

