var _a;
import express from "express";
import { connectToDatabase } from "./services/database.service.js";
import { staticHTML } from "./routes/routes.js";
import cors from 'cors';
const app = express();
app.use(cors());
app.options('*', cors());
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3005;
connectToDatabase()
    .then(() => {
    app.use(staticHTML);
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
//# sourceMappingURL=index.js.map