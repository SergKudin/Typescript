import session from 'express-session';
import sessionFileStore from 'session-file-store'
import * as dotenv from "dotenv";
import { CorsOptions } from 'cors';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

declare module "express-session" {
  export interface Session {
    userID?: string;
  }
}

dotenv.config();

// https config
const filePath: string = 'SSL';
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
const dataFileDir = path.join(__dirname, filePath);

const sslKey: string = path.join(dataFileDir, process.env.NAME_FILE_KEY || '');
const sslCrt: string = path.join(dataFileDir, process.env.NAME_FILE_CRT || '');

export const httpsOptions = {
  key: fs.readFileSync(sslKey),
  cert: fs.readFileSync(sslCrt)
};

//Adress data
export const adr = {
  ip: process.env.IP ?? '',
  PORT: Number(process.env.PORT ?? 3005),
}

//CORS config
export const corsOptions: CorsOptions = {
  credentials: true,
  origin: true
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