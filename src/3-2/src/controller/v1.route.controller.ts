import { Request, Response } from "express";
import { incrementIspgBooks } from "../services/countReadPageBook.servise.js";
import { incrementIsbnBooks } from "../services/countClickButtom.servise.js";
import { getAdminHtml } from "../templates/admin.template.js";
import { getActPagePagination, setActPagePagination } from "../services/paginationAdm.service.js";
import Book from "../models/book.models.js";
import { sql } from "../services/query.servise.js";
import { getSearchCodeHtml } from "../templates/search.templates.js";

export const v1RouteCtrl = {
  getBooks,
  reservBooks,
  getAdminPage,
  getAdminPaginationNext,
  getAdminPaginationPrev,
  getAdminPaginationSet,
  removeBook,
  addNewBook,
  getSearch,
  getSearchHtml,
};

type EmailRes = {
  success: boolean;
  data: {
    id: number;
    event: boolean;
    isbn: number;
    description?: string;
  }
}

type HtmlBook = {
  id: number;
  title: string;
  author: string;
}

async function getSearchHtml(req: Request, res: Response) {
  try {
    const search: string = req.query.search as string;
    res.status(200).send(await getSearchCodeHtml(search));
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}

async function getSearch(req: Request, res: Response) {
  try {
    const search: string = req.query.search as string;
    let result: HtmlBook[] = [];
    result = (await sql.searchBooks(search)).map(book => {
      return {
        id: book.booksId || 0,
        title: book.booksName,
        author: (book.autors.length > 0) ? book.autors.join(', ') : ''
      }
    });
    res.status(200).send(JSON.stringify({
      success: true,
      data: {
        total: { amount: result.length },
        books: result
      }
    }));
  }
  catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}

async function getBooks(req: Request, res: Response) {
  try {
    const id = req.params.id;
    res.status(200).send(await getBookPage(+id));
  }
  catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}

async function reservBooks(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const email = req.query.email;
    res.status(200).send({
      success: true,
      data: {
        id: id,
        event: true,
        isbn: await incrementIsbnBooks(+id)
      }
    });
  }
  catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}

async function getBookPage(bookId: number): Promise<EmailRes> {
  await incrementIspgBooks(bookId);
  const b: Book = await sql.getBookId(bookId);
  return {
    success: true,
    data: { id: b.booksId || 0, event: true, isbn: b.booksBtnClick || 0, description: b.booksDescription }
  }
}

async function getAdminPage(req: Request, res: Response) {
  try {
    res.status(200).send(await getAdminHtml());
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}

//  /api/v1/admin/pagination/next 
async function getAdminPaginationNext(req: Request, res: Response) {
  try {
    await setActPagePagination(await getActPagePagination() + 1);
    res.redirect("/api/v1/admin");
    return;
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}

//  /api/v1/admin/pagination/prev
async function getAdminPaginationPrev(req: Request, res: Response) {
  try {
    await setActPagePagination(await getActPagePagination() - 1);
    res.redirect("/api/v1/admin");
    return;
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}

//  /api/v1/admin/pagination/1
async function getAdminPaginationSet(req: Request, res: Response) {
  try {
    const nPage = req.params.nPage;
    await setActPagePagination((Number.isNaN(Number(nPage))) ? await getActPagePagination() : Number(nPage));
    res.redirect("/api/v1/admin");
    return;
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}

//  /api/v1/admin/books/26/remove - remove book
async function removeBook(req: Request, res: Response) {
  try {
    const id = req.params.id;
    console.log('removeBook = ' + id)

    res.status(200).send(await sql.softDeleteBook(+id));
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
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


