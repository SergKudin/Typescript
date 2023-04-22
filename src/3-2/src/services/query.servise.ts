import Autor from "../models/autor.models.js";
import Book from "../models/book.models.js";
import { dbCollection } from "./data.servise.js";
import sqlFile from "./file.service.js";
import fs from "fs";
import { getElementsBooksInPages } from "./paginationPgs.service.js";

export const sql = { addNewBook, getBooks, getBookId, softDeleteBook };


async function addNewBook(newBook: Book, filedata?: Express.Multer.File): Promise<boolean> {
  let success = false;
  newBook = await addBookId(newBook);
  newBook.booksImg = await addImgFile(newBook, filedata);

  console.log(newBook);

  await dbCollection.query(await sqlFile.getQuery('addBook'), [newBook.booksId, newBook.booksImg, newBook.booksName, newBook.booksDescription, newBook.booksYear, null]);

  for (let autor of newBook.autors) {
    let a: Autor = { autorsName: autor };
    a.booksId = newBook.booksId;
    a = await addAutorId(a);
    await dbCollection.query(await sqlFile.getQuery('addAutor'), [a.autorsId, a.autorsName, a.booksId]);
    console.log(a);
  }

  return success;
}

async function addBookId(newBook: Book): Promise<Book> {
  const [rows, fields] = await dbCollection.query(await sqlFile.getQuery('maxIdBooks'));
  const booksId = rows as Array<{ 'booksId': number }>;
  newBook.booksId = booksId[0].booksId + 1;
  return newBook;
}

async function addAutorId(newAutor: Autor): Promise<Autor> {
  const [rows, fields] = await dbCollection.query(await sqlFile.getQuery('maxIdAutors'));
  const autorsId = rows as Array<{ 'autorsId': number }>;
  newAutor.autorsId = autorsId[0].autorsId + 1;
  return newAutor;
}

async function addImgFile(newBook: Book, filedata?: Express.Multer.File): Promise<string> {
  if (filedata && newBook.booksId) {
    try {
      const filetype = filedata.mimetype.split("/");
      fs.promises.rename(filedata.path, `./src/HTML/img/${newBook.booksId}.${filetype[1]}`);
      return `${newBook.booksId}.${filetype[1]}`;
    } catch (err) {
      console.log(`Error rename file ${filedata.path}`);
      return '';
    }
  }
  return '';
}

async function getBooks(): Promise<Book[]> {
  const elements: number = getElementsBooksInPages();
  const [autors, fieldsAutors] = await dbCollection.query(await sqlFile.getQuery('allAutors'));
  const [books, fieldsBooks] = await dbCollection.query(await sqlFile.getQuery('booksLim'), elements);
  const b = books as Book[];
  const a = autors as Autor[];
  for (let book of b) {
    book.autors = [];
    a.filter(autor => autor.booksId === book.booksId)
      .forEach((autor, i) => book.autors[i] = autor.autorsName);
  }
  return b;
}

async function getBookId(bookId: number): Promise<Book> {
  const [autors, fieldsAutors] = await dbCollection.query(await sqlFile.getQuery('idAutors'), bookId);
  const a = autors as Autor[];
  const [books, fieldsBooks] = await dbCollection.query(await sqlFile.getQuery('idBooks'), bookId);
  const b = books as Book[];
  for (let book of b) {
    book.autors = [];
    a.filter(autor => autor.booksId === book.booksId)
      .forEach((autor, i) => book.autors[i] = autor.autorsName);
    // console.log(JSON.stringify(book));
  }
  return b[0];
}

async function softDeleteBook(bookId: number): Promise<{ success: boolean; }> {
  await dbCollection.query(await sqlFile.getQuery('softDeleteBook'), bookId);
  await dbCollection.query(await sqlFile.getQuery('softDeleteAutors'), bookId);
  return { success: true };
}
