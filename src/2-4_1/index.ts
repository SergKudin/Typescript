import express from "express";
import https from "https";
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import { routes } from "./routes/routes.js";
import { preparedStart } from "./services/data.service.js";
import { adr, corsOptions, httpsOptions, sessionConf, } from "./app.config.js";

const app = express();

app.use(cors(corsOptions))
  .options('*', cors());

if (process.env.DEBUG === 'true') app.use(morgan('dev'));

app.use(session(sessionConf));

preparedStart()
  .then(() => {
    app.use(routes);

    https.createServer(httpsOptions, app).listen(adr.PORT, adr.ip, () => {
      console.log(`Server started at ${`https://${adr.ip}:${adr.PORT}`}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });

