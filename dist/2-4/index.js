import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import { routes } from "./routes/routes.js";
import { preparedStart } from "./services/data.service.js";
import { adr, corsOptions, sessionConf } from "./app.config.js";
const app = express();
app.use(cors(corsOptions));
if (process.env.DEBUG === 'true')
    app.use(morgan('dev'));
app.use(session(sessionConf));
preparedStart()
    .then(() => {
    app.use(routes);
    app.listen(adr.PORT, adr.ip, () => {
        console.log(`Server started at ${`http://${adr.ip}:${adr.PORT}`}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
//# sourceMappingURL=index.js.map