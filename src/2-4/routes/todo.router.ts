// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service.js";
import Todo from "../Models/todo.js";

// Global Config
export const todosRouter = express.Router();
todosRouter.use(express.json());

// GET
todosRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const collTodo = collections.todo;
    if (collTodo === undefined) { throw new Error('collTodo = undefined'); }
    const todos = (await collTodo.find({}).toArray()) as unknown as Todo[];
    res.status(200).send(todos);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

todosRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;
  try {
    const query = { _id: new ObjectId(id) };
    const collTodo = collections.todo;
    if (collTodo === undefined) { throw new Error('collTodo = undefined'); }
    const todo = (await collTodo.findOne(query)) as unknown as Todo;
    if (todo) {
      res.status(200).send(todo);
    }
  } catch (error) {
    res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

// POST
todosRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newTodo = req.body as Todo;
    const collTodo = collections.todo;
    if (collTodo === undefined) { throw new Error('collTodo = undefined'); }
    const result = await collTodo.insertOne(newTodo);

    result
      ? res.status(201).send(`Successfully created a new Todo with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new Todo.");
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

// PUT
todosRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;
  try {
    const updatedTodo: Todo = req.body as Todo;
    const query = { _id: new ObjectId(id) };
    const collTodo = collections.todo;
    if (collTodo === undefined) { throw new Error('collTodo = undefined'); }
    const result = await collTodo.updateOne(query, { $set: updatedTodo });

    result
      ? res.status(200).send(`Successfully updated Todo with id ${id}`)
      : res.status(304).send(`Todo with id: ${id} not updated`);
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

// DELETE
todosRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const collTodo = collections.todo;
    if (collTodo === undefined) { throw new Error('collTodo = undefined'); }
    const result = await collTodo.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed Todo with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove Todo with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Todo with id ${id} does not exist`);
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});