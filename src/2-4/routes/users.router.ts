
// External Dependencies
import express, { Request, Response } from "express";
import { todosRouter } from "./todo.router.js";
import { login, logout, register } from "../Controller/v1.autorisation.js"

// Global Config
export const v1UsersRouter = express.Router();

v1UsersRouter.use("/items", todosRouter);

v1UsersRouter.use(express.json());

v1UsersRouter.post('/login', login);
v1UsersRouter.post('/logout', logout);
v1UsersRouter.post('/register', register);

