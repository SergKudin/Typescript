import { Request, Response } from "express";
import { incrementIspgBooks } from "../services/countReadPageBook.servise.js";
import { incrementIsbnBooks } from "../services/countClickButtom.servise.js";
import { getAdminHtml } from "../templates/admin.template.js";
import { getActPagePagination, setActPagePagination } from "../services/paginationAdm.service.js";
import Book from "../models/book.models.js";
import { sql } from "../services/query.servise.js";

export const v1RouteCtrl = { getBooks, getAdminPage, getAdminAddFunc, addNewBook };

type EmailRes = {
  success: boolean;
  data: {
    id: number;
    event: boolean;
    isbn: number;
    description?: string;
  }
}

//  /api/v1/books/23 - open page
//  /api/v1/books/23/order?email=xkfjgsfkj%40kjf.jh - reserve book
async function getBooks(req: Request, res: Response) {
  try {
    const dateIn: Array<string> = req.url.split('/');
    const bookId: number = Number(dateIn[2]);
    const email: string | undefined = dateIn[3]?.split('=').pop();
    if (!email) {
      res.status(200).send(await getBookPage(bookId));
    }
    else {
      res.status(200).send({
        success: true,
        data: {
          id: bookId,
          event: true,
          isbn: await incrementIsbnBooks(bookId)
        }
      });
    }
  }
  catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}

async function getBookPage(bookId: number): Promise<EmailRes> {
  await incrementIspgBooks(bookId);
  const { booksName,
    autors,
    booksId,
    booksImg,
    booksDescription,
    booksYear,
    booksPages,
    booksPgsClick,
    booksBtnClick,
  } = await sql.getBookId(bookId);
  return { success: true, data: { id: bookId, event: true, isbn: booksBtnClick || 0, description: booksDescription } }
}

//  /api/v1/admin
async function getAdminPage(req: Request, res: Response) {
  try {
    console.log('getAdminPage')
    res.status(200).send(await getAdminHtml());
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}

async function getAdminAddFunc(req: Request, res: Response) {
  try {
    const dateIn: Array<string> = req.url.split('/');
    if (dateIn[2] === 'pagination') {
      await adminAddFuncPagination(dateIn);
      res.redirect("/api/v1/admin");
      return;
    }
    if (dateIn[2] === 'books')
      res.status(200).send(await adminAddFuncBooks(dateIn));
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}

//  /api/v1/admin/pagination/next
//  /api/v1/admin/pagination/prev
//  /api/v1/admin/pagination/1
async function adminAddFuncPagination(dateIn: string[]) {
  const pagin: string = dateIn[3];
  if (pagin === 'next') {
    await setActPagePagination(await getActPagePagination() + 1);
    return;
  }
  if (pagin === 'prev') {
    await setActPagePagination(await getActPagePagination() - 1);
    return;
  }
  await setActPagePagination((Number.isNaN(Number(pagin))) ? await getActPagePagination() : Number(pagin));
}

//  /api/v1/admin/books/26/remove - remove book
async function adminAddFuncBooks(dateIn: string[]): Promise<{ success: boolean; }> {
  const booksId: number = Number(dateIn[3]);
  if (Number.isNaN(booksId)) throw new Error("The book ID is not a number.");
  if (dateIn[4] === 'remove')
    return await sql.softDeleteBook(booksId);
  return { success: false };
}

async function addNewBook(req: Request, res: Response) {
  try {
    let filedata: Express.Multer.File | undefined = req.file;
    const newBook = JSON.parse(req.body.newBook) as Book;

    await sql.addNewBook(newBook, filedata);

    res.status(200).send({ success: true });
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }

}


