import session from 'express-session';
import sessionFileStore from 'session-file-store'
import * as dotenv from "dotenv";
import { CorsOptions } from 'cors';

declare module "express-session" {
  export interface Session {
    userID?: string;
  }
}

dotenv.config();

//Adress data
export const adr = {
  ip: process.env.IP ?? '127.0.0.100',
  PORT: Number(process.env.PORT ?? 3005),
}

//CORS config
export const corsOptions: CorsOptions = {
  credentials: true,
  origin: true //'http://localhost:8080'
}

// Session config
const FileStore = sessionFileStore(session);
const fileStoreOptions = { path: process.env.SESSION_FILE_PATH };

export const sessionConf: session.SessionOptions = {
  store: new FileStore(fileStoreOptions),
  secret: process.env.SESSION_SECRET || 'Y{MTNjiSQ;KdnvaeoircOIHJOji:sw`a!JpAi|c',
  resave: true,                          // https://stackoverflow.com/questions/40381401/when-to-use-saveuninitialized-and-resave-in-express-session
  saveUninitialized: false,
  cookie: {
    sameSite: 'none',
    secure: true,
    maxAge: 1000 * 60 * 60 * 2  // ms*s*m*h
  },
}