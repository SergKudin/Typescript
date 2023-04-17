import express, { Request, Response } from "express";
import { executeQuery } from "../controller/sqlQuerys.controller.js";
import { getBook, getBookHtml } from "../templates/book.templates.js";
import { log } from "console";
import { incrementIsbnBooks } from "../services/countClickButtom.servise.js";
import { incrementIspgBooks } from "../services/countReadPageBook.servise.js";

// routes for v1
export const v1Router = express.Router();
v1Router.use(express.json());

v1Router.get("/items", executeQuery)

  // .post("/items", postItems)
  // .put("/items", putItems)
  // .delete("/items", delItems);

  .route('/books/*').get(async (req: Request, res: Response) => {
    try {
      const dateIn: Array<string> = req.url.split('/');
      const bookId: number = Number(dateIn[2]);
      console.log(dateIn);

      const email: string | undefined = dateIn[3]?.split('=').pop();
      if (!email) {
        incrementIspgBooks(bookId);
        const {
          booksName,
          autors,
          booksId,
          booksImg,
          booksDescription,
          booksYear,
          booksPages,
          booksPgsClick,
          booksBtnClick,
        } = await getBook(bookId);
        res.status(200).send({ success: true, data: { id: bookId, event: true, isbn: booksBtnClick || 0, description: booksDescription } })//.send(await getBook(bookId));
      }
      else {
        const clickButtom = await incrementIsbnBooks(bookId);
        res.status(200).send({ success: true, data: { id: bookId, event: true, isbn: clickButtom } });
      }
    }
    catch (err) {
      res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
    }
  })

