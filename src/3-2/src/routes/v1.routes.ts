import express from "express";
import { v1RouteCtrl } from "../controller/v1.route.controller.js";
import { typeMulter } from "../services/multer.servise.js";
import { checkAuth } from "../services/checkAutorisation.servise.js";

// routes for v1
export const v1Router = express.Router();
v1Router.use(express.json());

v1Router.get('/admin', checkAuth, v1RouteCtrl.getAdminPage)
  .get('/admin/pagination/next', v1RouteCtrl.getAdminPaginationNext)
  .get('/admin/pagination/prev', v1RouteCtrl.getAdminPaginationPrev)
  .get('/admin/pagination/:nPage', v1RouteCtrl.getAdminPaginationSet)
  .get('/admin/books/:id/remove', checkAuth, v1RouteCtrl.removeBook)
  .post('/admin/books/addBook', checkAuth, typeMulter, v1RouteCtrl.addNewBook)
  .get('/books/:id', v1RouteCtrl.getBooks)
  .get('/books/:id/order', v1RouteCtrl.reservBooks)
  .get('/books', v1RouteCtrl.getSearch)
  .get('/search', v1RouteCtrl.getSearchHtml)


