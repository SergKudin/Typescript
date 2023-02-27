
// External Dependencies
import express, { Request, Response } from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { v1UsersRouter } from "./users.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDir = path.join(__dirname, '../', 'HTTP');

// Global Config
export const routes = express.Router();
routes.use("/api/v1", v1UsersRouter);
routes.use("/static", express.static(staticDir));

routes.get('/', (req: Request, res: Response) => {
  try {
    res.sendFile(path.join(staticDir, "index.html"));
  } catch (err) {
    res.status(404).send({ error: `${(err as Error).message}` });
  }
})


