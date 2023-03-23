// External Dependencies
import express, { Request, Response } from "express";
import { login, logout, register } from "../Controller/autorisation.js"
import { getAllItems, postItems, putItems, delItems } from "../Controller/items.js"

// map routes for v2
export const v2RoutsMap = new Map([
  ['login', login],
  ['logout', logout],
  ['undefined', logout],
  ['register', register],
  ['getItems', getAllItems],
  ['deleteItem', delItems],
  ['addItem', postItems],
  ['createItem', postItems],
  ['editItem', putItems],
])

// routes for v2
export const v2Router = express.Router();
v2Router.use(express.json());

v2Router.route("/router").post((req: Request, res: Response) => {

  const func = v2RoutsMap.get(`${req.query.action}`);
  if (func) {
    func(req, res);
  } else {
    res.status(404).send(JSON.stringify({ error: `Not found` }));
  }
});

