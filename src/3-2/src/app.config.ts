import * as dotenv from "dotenv";
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

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

export const httpOptions = {};

//Adress data
export const adr = {
  ip: process.env.IP ?? '',
  PORT: Number(process.env.PORT ?? 3005),
};



