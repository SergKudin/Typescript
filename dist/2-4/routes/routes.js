import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { todosRouter } from "./todo.router.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const v1Router = express.Router();
v1Router.use(express.json());
v1Router.use("/items", todosRouter);
export const staticHTML = express.Router();
staticHTML.use("/api/v1", v1Router);
staticHTML.use(express.static(path.join(__dirname, '../', 'HTTP')));
//# sourceMappingURL=routes.js.map