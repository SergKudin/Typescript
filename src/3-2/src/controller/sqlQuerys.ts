import { Request, Response } from "express";
import { dbCollection } from "../services/data.servise.js";
import sqlFile from "../services/file.service.js";


// processing requests to work with Todo
export const executeQuery = async function (req: Request, res: Response) {
  try {
    const [rows, fields] = await dbCollection.query(await sqlFile.getQuery('allAutors'));
    if (rows) {
      res.status(200).send(JSON.stringify(rows));
    } else {
      res.status(404).send({ error: 'forbidden' });
    }
  } catch (err) {
    res.status(500).send({ error: `${(err as Error).message}` });
  }
};
