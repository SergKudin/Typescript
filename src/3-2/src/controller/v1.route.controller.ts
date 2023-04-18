import { Request, Response } from "express";
import { incrementIspgBooks } from "../services/countReadPageBook.servise.js";
import { getBook } from "../templates/book.templates.js";
import { incrementIsbnBooks } from "../services/countClickButtom.servise.js";
import { getAdminHtml } from "../templates/admin.template.js";
import { getActPagePagination, setActPagePagination } from "../services/paginationAdm.service.js";

export const v1RouteCtrl = { getBooks, getAdminPage, getAdminAddFunc };

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
  } = await getBook(bookId);
  return { success: true, data: { id: bookId, event: true, isbn: booksBtnClick || 0, description: booksDescription } }
}

//  /api/v1/admin
async function getAdminPage(req: Request, res: Response) {
  try {
    console.log((req.body));

    res.status(200).send(await getAdminHtml());
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}

async function getAdminAddFunc(req: Request, res: Response) {
  try {
    const dateIn: Array<string> = req.url.split('/');
    console.log(dateIn);
    if (dateIn[2] === 'pagination') await adminAddFuncPagination(dateIn);
    if (dateIn[2] === 'books') await adminAddFuncBooks(dateIn);
    res.redirect("/api/v1/admin");
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
async function adminAddFuncBooks(dateIn: string[]) {
  const booksId: number = Number(dateIn[3]);
  if (Number.isNaN(booksId)) throw new Error("The book ID is not a number.");
  if (dateIn[4] === 'remove') deleteBook(booksId);
}

function deleteBook(booksId: number) {
  throw new Error("Function not implemented.");
}

