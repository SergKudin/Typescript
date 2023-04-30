import Autor from "../models/autor.models.js";
import Book from "../models/book.models.js";
import { dbCollection } from "./data.servise.js";
import sqlFile from "./file.service.js";
import fs from "fs";
import { getElementsBooksInPages } from "./paginationPgs.service.js";

let systemStart = true;

export const sql = {
  addNewBook, getBooks, getBookId, softDeleteBook, getIsbnBooks, getIspgBooks,
  getAllIdBooks, getBooksWhereIdInPage, countBooks, searchBooks, createNewDB
};

async function createNewDB() {
  if (systemStart && ((process.env.CREATE_NEW_DB ?? 'false') === 'true')) {
    console.log(`CREATE NEW DB!!!`)
    await queryConveyor(['dropTableBooks', 'dropTableAutors', 'dropTableBooksAutors',
      'createTableBooks', 'createTableAutors', 'createTableBooksAutors',
      'insertDataBook', 'insertDataBook2', 'insertDataAutors', 'insertDataBooksAutors']);
    systemStart = false;
    console.log(`NEW DB CREATED!!!`);
  }
}

async function queryConveyor(arrQuery: string[]) {
  for (let query of arrQuery) {
    await dbCollection.query(await sqlFile.getQuery(query));
  }
}

async function addNewBook(newBook: Book, filedata?: Express.Multer.File): Promise<boolean> {
  newBook = await addBookId(newBook);
  newBook.booksImg = await addImgFile(newBook, filedata);
  await dbCollection.query(await sqlFile.getQuery('addBook'), [newBook.booksId, newBook.booksImg, newBook.booksName, newBook.booksDescription, newBook.booksYear, null]);
  for (let autor of newBook.autors) {
    let a: Autor = { autorsName: autor };
    a.autorsId = await getAutorsId(a);
    if (a.autorsId === 0) {
      a.autorsId = await getNewAutorId(a);
      await dbCollection.query(await sqlFile.getQuery('addAutor'), [a.autorsId, a.autorsName]);
    }
    await dbCollection.query(await sqlFile.getQuery('addBooksAuthors'), [newBook.booksId, a.autorsId]);
  }
  return false;
}

async function getAutorsId(autor: Autor): Promise<number> {
  const [rows, fields] = await dbCollection.query(await sqlFile.getQuery('getAutorsId'), autor);
  const autorId = rows as Array<{ 'autorsId': number }>;
  console.log(autorId);
  return (autorId.length === 0) ? 0 : autorId[0].autorsId;
}

async function addBookId(newBook: Book): Promise<Book> {
  const [rows, fields] = await dbCollection.query(await sqlFile.getQuery('maxIdBooks'));
  const booksId = rows as Array<{ 'booksId': number }>;
  newBook.booksId = booksId[0].booksId + 1;
  return newBook;
}

async function getNewAutorId(newAutor: Autor): Promise<number> {
  const [rows, fields] = await dbCollection.query(await sqlFile.getQuery('maxIdAutors'));
  const autorsId = rows as Array<{ 'autorsId': number }>;
  return (autorsId[0].autorsId + 1);
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

async function addAutorsBooks(books: Book[]): Promise<Book[]> {
  for (let book of books) {
    const [autors, fieldsAutors] = await dbCollection.query(await sqlFile.getQuery('getAutorsBook'), book.booksId);
    book.autors = (autors as Autor[]).map(autor => { return autor.autorsName });
  };
  return books;
}

async function getBooks(): Promise<Book[]> {  // add func search
  const elements: number = getElementsBooksInPages();
  const [books, fieldsBooks] = await dbCollection.query(await sqlFile.getQuery('booksLim'), elements);
  return await addAutorsBooks(books as Book[]);
}

async function getBookId(bookId: number): Promise<Book> {
  const [books, fieldsBooks] = await dbCollection.query(await sqlFile.getQuery('idBooks'), bookId);
  return (await addAutorsBooks(books as Book[]))[0];
}

async function getBooksWhereIdInPage(subArrPage: string): Promise<Book[]> {
  const [books, fieldsBooks] = await dbCollection.query((await sqlFile.getQuery('booksWhereIdIn')).replace('?', subArrPage));
  return await addAutorsBooks(books as Book[]);
}

async function searchBooks(foundStr: string): Promise<Book[]> {
  const [books, fields] = await dbCollection.query(await sqlFile.getQuery('foundBooks'), `%${foundStr}%`);
  return await addAutorsBooks(books as Book[]);
}

async function countBooks(): Promise<number> {  // add func search
  const [nBooks, fieldsAutors] = await dbCollection.query(await sqlFile.getQuery('countBooks'));
  const countBooks = nBooks as Array<{ 'nBook': number }>;
  return countBooks[0].nBook;
}

async function softDeleteBook(bookId: number): Promise<{ success: boolean; }> {
  await dbCollection.query(await sqlFile.getQuery('softDeleteBook'), bookId);
  return { success: true };
}

async function getIsbnBooks(id: number): Promise<number> {
  const [booksBtnClick, fields] = await dbCollection.query(await sqlFile.getQuery('getClickButtom'), id);
  const clickButtom = booksBtnClick as Array<{ 'booksBtnClick': number }> || 0;
  return clickButtom[0].booksBtnClick;
}

async function getIspgBooks(id: number): Promise<number> {
  const [booksPgsClick, fields] = await dbCollection.query(await sqlFile.getQuery('getReadPageBook'), id);
  const countReadPage = booksPgsClick as Array<{ 'booksPgsClick': number }> || 0;
  return countReadPage[0].booksPgsClick;
}

async function getAllIdBooks(): Promise<number[]> {
  const [booksId, fields] = await dbCollection.query(await sqlFile.getQuery('getAllIdBooks'));
  const arrObjId = booksId as Array<{ 'booksId': number }>;
  return arrObjId.map(item => { return item.booksId })
}
