import express from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "./services/database.service.js"
import { routes } from "./routes/routes.js";
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import sessionFileStore from 'session-file-store'

declare module "express-session" {
  export interface Session {
    userID?: string;
  }
}

const FileStore = sessionFileStore(session);
const fileStoreOptions = { path: "../sessions" };

const PORT = process.env.PORT ?? 3005;
const app = express();

app.use(cors());
app.options('*', cors());
app.use(morgan('dev'))
app.use(session({
  store: new FileStore(fileStoreOptions),
  secret: process.env.SESSION_SECRET || 'Y{MTNjiSQ;KdnvaeoircOIHJOji:sw`a!JpAi|c',
  resave: true,                          // https://stackoverflow.com/questions/40381401/when-to-use-saveuninitialized-and-resave-in-express-session
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 2 },  // ms*s*m*h
}));

connectToDatabase()
  .then(() => {
    app.use(routes);

    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });

