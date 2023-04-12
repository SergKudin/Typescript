
// External Dependencies
import express, { Request, Response } from "express";
import path from 'path';
import { __dirname } from "../app.config.js";
import { v1Router } from "./v1.routes.js";
import { getBooksHtml } from "../templates/books.templates.js";
import { getBookHtml } from "../templates/book.templates.js";
import { addElementsBooks, removeElementsBooks } from "../services/paginationPgs.service.js";

const staticDir = path.join(__dirname, 'HTML');

// Global Config
export const routes = express.Router();
routes.use(express.json());

routes.use("/api/v1", v1Router);
// routes.use("/api/v2", v2Router);

// route for get html 
routes.use("/static", express.static(staticDir));

routes.get('/', async (req: Request, res: Response) => {
  try {
    res.status(200).send(await getBooksHtml());
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
})
  .get('/add', async (req: Request, res: Response) => {
    try {
      await addElementsBooks();
      res.redirect("/");
    } catch (err) {
      res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
    }
  })
  .get('/remove', async (req: Request, res: Response) => {
    try {
      await removeElementsBooks()
      res.redirect("/");
    } catch (err) {
      res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
    }
  })
  .route('/book/*').get(async (req: Request, res: Response) => {
    try {
      const bookId: number = Number(req.url.split('/').pop());
      res.status(200).send(await getBookHtml(bookId));
    } catch (err) {
      res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
    }
  });


