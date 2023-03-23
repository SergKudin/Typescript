
// External Dependencies
import express, { Request, Response } from "express";
import path from 'path';
import { __dirname } from "../app.config.js";
import { v2Router } from "./v2.routers.js";
import { v1Router } from "./v1.routers.js";

const staticDir = path.join(__dirname, 'HTTP');

// Global Config
export const routes = express.Router();
routes.use(express.json());

routes.use("/api/v1", v1Router);
routes.use("/api/v2", v2Router);

// route for get index.html 
routes.use("/static", express.static(staticDir));

routes.get('/', (req: Request, res: Response) => {
  try {
    res.sendFile(path.join(staticDir, "index.html"));
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
})

