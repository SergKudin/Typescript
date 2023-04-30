import { Request, Response } from "express";
import { getBooksHtml } from "../templates/books.templates.js";
import { addElementsBooks, removeElementsBooks } from "../services/paginationPgs.service.js";
import { getAdminHtml } from "../templates/admin.template.js";
import { getBookHtml } from "../templates/book.templates.js";
import { sql } from "../services/query.servise.js";

export const routeCtrl = { startPage, addBooksToPage, removeBooksToPage, getAdminPage, getBookPage };

async function startPage(req: Request, res: Response) {
  try {
    await sql.createNewDB();
    res.status(200).send(await getBooksHtml());
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}

async function addBooksToPage(req: Request, res: Response) {
  try {
    await addElementsBooks();
    res.redirect("/");
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}

async function removeBooksToPage(req: Request, res: Response) {
  try {
    await removeElementsBooks()
    res.redirect("/");
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}

async function startSearchPage(req: Request, res: Response) {
  try {
    res.status(200).send(await getBooksHtml());
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}

async function addBooksToSearchPage(req: Request, res: Response) {
  try {
    await addElementsBooks();
    res.redirect("/");
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}

async function removeBooksToSearchPage(req: Request, res: Response) {
  try {
    await removeElementsBooks()
    res.redirect("/");
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}

async function getAdminPage(req: Request, res: Response) {
  try {
    res.status(200).send(await getAdminHtml());
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}

async function getBookPage(req: Request, res: Response) {
  try {
    const bookId: number = Number(req.url.split('/').pop());
    res.status(200).send(await getBookHtml(bookId));
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
}