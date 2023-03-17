var _a, _b;
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import * as dotenv from "dotenv";
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
dotenv.config();
const filePath = 'SSL';
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
const dataFileDir = path.join(__dirname, filePath);
const sslKey = path.join(dataFileDir, process.env.NAME_FILE_KEY || '');
const sslCrt = path.join(dataFileDir, process.env.NAME_FILE_CRT || '');
export const httpsOptions = {
    key: fs.readFileSync(sslKey),
    cert: fs.readFileSync(sslCrt)
};
export const adr = {
    ip: (_a = process.env.IP) !== null && _a !== void 0 ? _a : '',
    PORT: Number((_b = process.env.PORT) !== null && _b !== void 0 ? _b : 3005),
};
export const corsOptions = {
    credentials: true,
    origin: true
};
const FileStore = sessionFileStore(session);
const fileStoreOptions = { path: process.env.SESSION_FILE_PATH };
export const sessionConf = {
    store: new FileStore(fileStoreOptions),
    secret: process.env.SESSION_SECRET || 'Y{MTNjiSQ;KdnvaeoircOIHJOji:sw`a!JpAi|c',
    resave: true,
    saveUninitialized: false,
    cookie: {
        sameSite: 'none',
        secure: true,
        maxAge: 1000 * 60 * 60 * 2
    },
};
//# sourceMappingURL=app.config.js.map