// External Dependencies
import express, { Request, Response } from "express";
import { getAllItems, postItems, putItems, delItems } from "../Controller/v1.items.js"

// Global Config
export const todosRouter = express.Router();
todosRouter.use(express.json());
todosRouter.get("/", getAllItems);
todosRouter.post("/", postItems);
todosRouter.put("/", putItems);
todosRouter.delete("/", delItems);

// // GET
// todosRouter.get("/", async (_req: Request, res: Response) => {
//   try {
//     log(`/api/v1/items?get`);
//     const jsonOut = JSON.stringify({ items: await getItems() });
//     res.status(200).send(jsonOut);
//   } catch (err) {
//     res.status(500).send({ error: `${(err as Error).message}` });
//     log('/api/v1/items?get = error');
//   }
// });

// // POST
// todosRouter.post("/", async (req: Request, res: Response) => {
//   log(`/api/v1/items?post`);
//   try {
//     let newTodo = req.body as Todo; // add check new Todo
//     let result = await createItem(newTodo);
//     result
//       ? res.status(201).send(JSON.stringify({ id: result.insertedId }))
//       : res.status(500);
//     log(JSON.stringify(result));
//   } catch (err) {
//     res.status(400).send({ error: `${(err as Error).message}` });
//     console.error(err);
//     log('/api/v1/items?post = error');
//   }
// });

// // PUT
// todosRouter.put("/", async (req: Request, res: Response) => {
//   log(`/api/v1/items?put`);
//   try {
//     const result = await putItem(req.body as Todo)
//       ? res.status(200).send(JSON.stringify({ ok: true }))
//       : res.status(304).send(JSON.stringify({ ok: false }));
//     log(result ? `Successfully updated Todo with id ${req.body.id}` : `Todo with id: ${req.body.id} not updated`);
//   } catch (err) {
//     res.status(400).send({ error: `${(err as Error).message}` });
//     console.error(err);
//     log(`error /api/v1/items?put`);
//   }
// });

// // DELETE
// todosRouter.delete("/", async (req: Request, res: Response) => {
//   log(`/api/v1/items?delete`);
//   try {
//     log(JSON.stringify(req.body));
//     const id = req.body.id;
//     const result = await deleteItem(req.body as Todo);

//     if (result && result.deletedCount) {
//       log(`Successfully removed Todo with id ${id}`);
//       res.status(202).send(JSON.stringify({ ok: true }));
//     } else if (!result) {
//       log(`Failed to remove Todo with id ${id}`);
//       res.status(400).send(JSON.stringify({ ok: false }));
//     } else if (!result.deletedCount) {
//       log(`Todo with id ${id} does not exist`);
//       res.status(404).send(JSON.stringify({ ok: false }));
//     }
//   } catch (err) {
//     res.status(400).send({ error: `${(err as Error).message}` });
//     console.error(err);
//     log(`error /api/v1/items?delete`);
//   }
// });

// // function
// async function getItems() {
//   log(`get all Items `);
//   const collTodo = collections.todo;
//   if (collTodo === undefined) { throw new Error('collTodo = undefined'); }
//   const todos = (await collTodo.find({}).toArray()) as unknown as Todo[];
//   todos.forEach(item => { item.id = `${item._id}` });
//   return todos;
// }

// async function createItem(item: Todo) {
//   log(`createItem ` + JSON.stringify(item));
//   if (item.checked === undefined) item.checked = false;
//   let collTodo = collections.todo;
//   if (collTodo === undefined) { throw new Error('collTodo = undefined'); }
//   const chekTodo = await collTodo.findOne({ text: item.text });
//   return !chekTodo ? await collTodo.insertOne(item) : { insertedId: chekTodo._id };
// }

// async function putItem(item: Todo) {
//   log(`putItem ` + JSON.stringify(item));
//   const id = item.id;
//   const query = { _id: new ObjectId(id) };
//   const collTodo = collections.todo;
//   if (collTodo === undefined) { throw new Error('collTodo = undefined'); }
//   return await collTodo.updateOne(query, { $set: item });
// }

// async function deleteItem(item: Todo) {
//   log(`deleteItem ` + JSON.stringify(item));
//   const id = item.id;
//   const query = { _id: new ObjectId(id) };
//   const collTodo = collections.todo;
//   if (collTodo === undefined) { throw new Error('collTodo = undefined'); }
//   return await collTodo.deleteOne(query);
// }




// todosRouter.put("/:id", async (req: Request, res: Response) => {
//   const id = req?.params?.id;
//   log(`/api/v1/items?putId=${id}`);
//   try {
//     const updatedTodo: Todo = req.body as Todo;
//     const query = { _id: new ObjectId(id) };
//     const collTodo = collections.todo;
//     if (collTodo === undefined) { throw new Error('collTodo = undefined'); }
//     const result = await collTodo.updateOne(query, { $set: updatedTodo });

//     result
//       ? res.status(200).send(JSON.stringify({ ok: 'true' }))
//       : res.status(304).send(JSON.stringify({ ok: 'false' }));
//     log(result ? `Successfully updated Todo with id ${id}` : `Todo with id: ${id} not updated`);

//   } catch (error: any) {
//     console.error(error.message);
//     res.status(400).send(error.message);
//     log(`error /api/v1/items?putId=${id}`);
//   }
// });

// todosRouter.delete("/:id", async (req: Request, res: Response) => {
//   const id = req?.params?.id;

//   try {
//     const query = { _id: new ObjectId(id) };
//     const collTodo = collections.todo;
//     if (collTodo === undefined) { throw new Error('collTodo = undefined'); }
//     const result = await collTodo.deleteOne(query);

//     if (result && result.deletedCount) {
//       res.status(202).send(`Successfully removed Todo with id ${id}`);
//     } else if (!result) {
//       res.status(400).send(`Failed to remove Todo with id ${id}`);
//     } else if (!result.deletedCount) {
//       res.status(404).send(`Todo with id ${id} does not exist`);
//     }
//   } catch (error: any) {
//     console.error(error.message);
//     res.status(400).send(error.message);
//   }
// });
