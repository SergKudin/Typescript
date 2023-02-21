import express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service.js";
export const todosRouter = express.Router();
todosRouter.use(express.json());
todosRouter.get("/", async (_req, res) => {
    try {
        const collTodo = collections.todo;
        if (collTodo === undefined) {
            throw new Error('collTodo = undefined');
        }
        const todos = (await collTodo.find({}).toArray());
        res.status(200).send(todos);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
todosRouter.get("/:id", async (req, res) => {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const query = { _id: new ObjectId(id) };
        const collTodo = collections.todo;
        if (collTodo === undefined) {
            throw new Error('collTodo = undefined');
        }
        const todo = (await collTodo.findOne(query));
        if (todo) {
            res.status(200).send(todo);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});
todosRouter.post("/", async (req, res) => {
    try {
        const newTodo = req.body;
        const collTodo = collections.todo;
        if (collTodo === undefined) {
            throw new Error('collTodo = undefined');
        }
        const result = await collTodo.insertOne(newTodo);
        result
            ? res.status(201).send(`Successfully created a new Todo with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new Todo.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
todosRouter.put("/:id", async (req, res) => {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const updatedTodo = req.body;
        const query = { _id: new ObjectId(id) };
        const collTodo = collections.todo;
        if (collTodo === undefined) {
            throw new Error('collTodo = undefined');
        }
        const result = await collTodo.updateOne(query, { $set: updatedTodo });
        result
            ? res.status(200).send(`Successfully updated Todo with id ${id}`)
            : res.status(304).send(`Todo with id: ${id} not updated`);
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
todosRouter.delete("/:id", async (req, res) => {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const query = { _id: new ObjectId(id) };
        const collTodo = collections.todo;
        if (collTodo === undefined) {
            throw new Error('collTodo = undefined');
        }
        const result = await collTodo.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed Todo with id ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove Todo with id ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Todo with id ${id} does not exist`);
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
//# sourceMappingURL=todo.router.js.map