// External Dependencies
import express, { Request, Response } from "express";
import { getAllItems, postItems, putItems, delItems } from "../Controller/v1.items.js"

// Global Config
export const todosRouter = express.Router();
todosRouter.use(express.json())
  .get("/", getAllItems)
  .post("/", postItems)
  .put("/", putItems)
  .delete("/", delItems);
