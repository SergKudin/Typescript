import Book from "../models/book.models.js";
import { sql } from "./query.servise.js";

const numBooksTableMin: number = 10;
let actualPagePagination: number = 0;
let numPagePagination: number = 1;

export async function getSubArrPagesPagination(): Promise<number[][]> {
  const arr: number[] = await sql.getAllIdBooks();
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

export async function getSubArrPageBooks(): Promise<Book[]> {
  const arr: number[][] = await getSubArrPagesPagination();
  return await sql.getBooksWhereIdInPage(arr[actualPagePagination].join(', '));
}


