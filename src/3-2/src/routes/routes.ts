
// External Dependencies
import express from "express";
import path from 'path';
import { __dirname } from "../app.config.js";
import { v1Router } from "./v1.routes.js";
import { routeCtrl } from "../controller/route.controller.js";

const staticDir = path.join(__dirname, 'HTML');

// Global Config
export const routes = express.Router();
routes.use(express.json());

routes.use("/api/v1", v1Router);
// routes.use("/api/v2", v2Router);

// route for get html 
routes.use("/static", express.static(staticDir));

routes.get('/', routeCtrl.startPage)
  .get('/add', routeCtrl.addBooksToPage)
  .get('/remove', routeCtrl.removeBooksToPage)
  .route('/book/*').get(routeCtrl.getBookPage);


