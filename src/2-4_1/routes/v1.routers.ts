// External Dependencies
import express, { Request, Response } from "express";
import { login, logout, register } from "../Controller/autorisation.js"
import { getAllItems, postItems, putItems, delItems } from "../Controller/items.js"

// routes for v1
export const v1Router = express.Router();
v1Router.use(express.json());

v1Router.post('/login', login)
  .post('/logout', logout)
  .post('/register', register)
  .get("/items", getAllItems)
  .post("/items", postItems)
  .put("/items", putItems)
  .delete("/items", delItems);