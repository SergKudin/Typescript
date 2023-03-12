var _a, _b;
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import * as dotenv from "dotenv";
dotenv.config();
export const adr = {
    ip: (_a = process.env.IP) !== null && _a !== void 0 ? _a : '127.0.0.100',
    PORT: Number((_b = process.env.PORT) !== null && _b !== void 0 ? _b : 3005),
};
export const corsOptions = {
    credentials: true,
};
const FileStore = sessionFileStore(session);
const fileStoreOptions = { path: process.env.SESSION_FILE_PATH };
export const sessionConf = {
    store: new FileStore(fileStoreOptions),
    secret: process.env.SESSION_SECRET || 'Y{MTNjiSQ;KdnvaeoircOIHJOji:sw`a!JpAi|c',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 2 },
};
//# sourceMappingURL=app.config.js.map