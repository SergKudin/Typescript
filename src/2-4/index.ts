import express from "express";
import { connectToDatabase } from "./services/database.service.js"
import { staticHTML } from "./routes/routes.js";
import cors from 'cors';
import path from "path";

const app = express();
app.use(cors());
app.options('*', cors());
const PORT = process.env.PORT ?? 3005;

connectToDatabase()
  .then(() => {
    app.use(staticHTML);

    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });

