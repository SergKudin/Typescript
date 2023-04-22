import express from "express";
import { executeQuery } from "../controller/sqlQuerys.controller.js";
import { v1RouteCtrl } from "../controller/v1.route.controller.js";
import { typeMulter } from "../services/multer.servise.js";

// routes for v1
export const v1Router = express.Router();
v1Router.use(express.json());

v1Router.get("/items", executeQuery);
v1Router.route('/admin').get(v1RouteCtrl.getAdminPage);
v1Router.route('/admin/*').get(v1RouteCtrl.getAdminAddFunc);
v1Router.route('/books/*').get(v1RouteCtrl.getBooks);
v1Router.post('/admin/books/addBook', typeMulter, v1RouteCtrl.addNewBook);


