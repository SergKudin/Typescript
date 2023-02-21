import express from "express";
import { connectToDatabase } from "./services/database.service.js";
import { todosRouter } from "./routes/todo.router.js";
const app = express();
const PORT = 3005;
connectToDatabase()
    .then(() => {
    app.use("/api/v1/items", todosRouter);
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
//# sourceMappingURL=index.js.map