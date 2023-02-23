
// External Dependencies
import express, { Request, Response } from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service.js";
import Todo from "../Models/todo.js";
import { todosRouter } from "./todo.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Global Config
export const v1Router = express.Router();
v1Router.use(express.json());
v1Router.use("/items", todosRouter);

export const staticHTML = express.Router();
// staticHTML.use(express.json());
staticHTML.use("/api/v1", v1Router);
staticHTML.use(express.static(path.join(__dirname, '../', 'HTTP')));
staticHTML.get('/', (req: Request, res: Response) => {
  res.sendFile("index.html");
})


