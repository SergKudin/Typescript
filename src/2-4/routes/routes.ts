
// External Dependencies
import express, { Request, Response } from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { v1UsersRouter } from "./users.router.js";
import { v2RoutsMap } from "./v2.map.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDir = path.join(__dirname, '../', 'HTTP');

// Global Config
export const routes = express.Router();
routes.use(express.json());

routes.use("/api/v1", v1UsersRouter);
routes.route("/api/v2/router").post((req: Request, res: Response) => {
  console.log(`${req.query.action}`);
  // console.log(`${v2RoutsMap.get(`${req.query.action}`)}`);


  const func = v2RoutsMap.get(`${req.query.action}`);
  if (func) {
    func(req, res);
  } else {
    res.status(404).send(JSON.stringify({ error: `Not found` }));
  }
});

routes.use("/static", express.static(staticDir));

routes.get('/', (req: Request, res: Response) => {
  try {
    res.sendFile(path.join(staticDir, "index.html"));
  } catch (err) {
    res.status(404).send(JSON.stringify({ error: `${(err as Error).message}` }));
  }
})


