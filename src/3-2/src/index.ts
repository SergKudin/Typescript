import express from "express";
import http from "http";
import morgan from 'morgan';
import { preparedStart } from "./services/data.servise.js";
import { adr, httpOptions, httpsOptions } from "./app.config.js";
import { routes } from "./routes/routes.js";

const app = express();

if (process.env.DEBUG === 'true') app.use(morgan('dev'));

preparedStart()
  .then(() => {
    app.use(routes);

    http.createServer(httpOptions, app).listen(adr.PORT, adr.ip, () => {
      console.log(`Server started at ${`https://${adr.ip}:${adr.PORT}`}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });

