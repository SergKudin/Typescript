// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service.js";
import Todo from "../Models/todo.js";
// import { log } from "../utils/function.js";
import { create } from "domain";

// Global Config
export const getAllItems = async function (req: Request, res: Response) {
  try {
    if (req.session.userID) {
      const collTodo = collections.todo;
      if (!collTodo) { throw new Error('no connect DB'); }
      const todos = (await collTodo.find({ user: req.session.userID }).toArray()) as unknown as Todo[];
      const allTodos = todos.map(todo => todo['id'] = `${todo._id}`);
      res.status(200).send(JSON.stringify({ items: todos }));
    } else {
      res.status(404).send({ error: 'forbidden' });
    }
  } catch (err) {
    res.status(500).send({ error: `${(err as Error).message}` });
  }
};

export const postItems = async function (req: Request, res: Response) {
  try {
    let newTodo = req.body as Todo; // add check new Todo
    if (req.session.userID) {
      let collTodo = collections.todo;
      if (!collTodo) { throw new Error('no connect DB'); }
      const chekTodo = await collTodo.findOne({ user: req.session.userID, text: newTodo.text });
      if (!chekTodo) {
        newTodo.user = req.session.userID;
        if (!newTodo.checked) newTodo.checked = false;
        let result = await collTodo.insertOne(newTodo);
        let id = result.insertedId;
        res.status(201).send(JSON.stringify({ id: id }));
        // await collTodo.updateOne({ _id: id }, { $set: newTodo.id = `${id}` });
      } else {
        res.status(200).send(JSON.stringify({ id: chekTodo._id }));
      }
    } else {
      res.status(404).send({ error: 'forbidden' });
    }
  } catch (err) {
    res.status(400).send({ error: `${(err as Error).message}` });
    console.error(err);
  }
};

export const putItems = async function (req: Request, res: Response) {
  try {
    if (req.session.userID) {
      let todo = req.body as Todo;
      const query = { user: req.session.userID, _id: new ObjectId(todo.id) };
      const collTodo = collections.todo;
      if (!collTodo) { throw new Error('no connect DB'); }
      const result = await collTodo.updateOne(query, { $set: todo });
      result
        ? res.status(200).send(JSON.stringify({ ok: true }))
        : res.status(304).send(JSON.stringify({ error: 'Not Modified' }));
    } else {
      res.status(404).send({ error: 'forbidden' });
    }
  } catch (err) {
    res.status(400).send({ error: `${(err as Error).message}` });
    console.error(err);
  }
};

export const delItems = async function (req: Request, res: Response) {
  try {
    if (req.session.userID) {
      const query = { user: req.session.userID, _id: new ObjectId(req.body.id) };
      const collTodo = collections.todo;
      if (!collTodo) { throw new Error('no connect DB'); }
      const result = await collTodo.deleteOne(query);
      if (result && result.deletedCount) {
        res.status(202).send(JSON.stringify({ ok: true }));
      } else if (!result) {
        res.status(400).send(JSON.stringify({ error: 'Not deleted' }));
      } else if (!result.deletedCount) {
        res.status(404).send(JSON.stringify({ error: 'Not found' }));
      }
    } else {
      res.status(404).send({ error: 'forbidden' });
    }
  } catch (err) {
    res.status(400).send({ error: `${(err as Error).message}` });
    console.error(err);
  }
};

// function
async function getItems() {
  const collTodo = collections.todo;
  if (collTodo === undefined) { throw new Error('no connect DB'); }
  const todos = (await collTodo.find({}).toArray()) as unknown as Todo[];
  todos.forEach(item => { item.id = `${item._id}` });
  return todos;
}

async function createItem(item: Todo) {
  if (item.checked === undefined) item.checked = false;
  let collTodo = collections.todo;
  if (collTodo === undefined) { throw new Error('no connect DB'); }
  const chekTodo = await collTodo.findOne({ text: item.text });
  return !chekTodo ? await collTodo.insertOne(item) : { insertedId: chekTodo._id };
}

async function putItem(item: Todo) {
  const id = item.id;
  const query = { _id: new ObjectId(id) };
  const collTodo = collections.todo;
  if (!collTodo) { throw new Error('no connect DB'); }
  return await collTodo.updateOne(query, { $set: item });
}

async function deleteItem(item: Todo) {
  const id = item.id;
  const query = { _id: new ObjectId(id) };
  const collTodo = collections.todo;
  if (!collTodo) { throw new Error('no connect DB'); }
  return await collTodo.deleteOne(query);
}




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




// // External Dependencies
// import express, { Request, Response } from "express";
// import { ObjectId } from "mongodb";
// import { collections } from "../services/database.service.js";
// import Todo from "../Models/todo.js";

// // Global Config
// export const getAllItems = async function (req: Request, res: Response) {
//   try {
//     let collUser = collections.user;
//     if (collUser === undefined) { throw new Error('no connect DB'); }
//     const chekUser = await collUser.findOne({ autUser: req.session.userID });
//     if (chekUser) {
//       if (chekUser.items) {
//         res.status(200).send(JSON.stringify({ items: chekUser.items }));
//       } else {
//         res.status(200).send(JSON.stringify({ items: [] }))
//       }
//     } else {
//       res.status(404).send(JSON.stringify({ error: 'forbidden' }))
//     }
//   } catch (err) {
//     res.status(500).send({ error: `${(err as Error).message}` });
//   }
// };

// export const postItems = async function (req: Request, res: Response) {
//   try {
//     let collUser = collections.user;
//     if (collUser === undefined) { throw new Error('no connect DB'); }
//     let chekUser = await collUser.findOne({ autUser: req.session.userID });
//     if (chekUser) {
//       let newTodo = req.body as Todo; // add check new Todo
//       if (newTodo.checked === undefined) newTodo.checked = false;
//       const todos: Todo[] = chekUser.items;
//       if (!todos.map(item => item.text).includes(newTodo.text)) {
//         newTodo.id = Date.now();
//         chekUser.items = todos.push(newTodo);
//         await collUser.updateOne(chekUser._id, chekUser);
//       }
//       res.status(201).send(JSON.stringify({ id: newTodo.id }));
//     }
//     res.status(404).send(JSON.stringify({ error: 'Error. User is not found' }))
//   } catch (err) {
//     res.status(400).send({ error: `${(err as Error).message}` });
//     console.error(err);
//   }
// };

// export const putItems = async function (req: Request, res: Response) {
//   try {
//     const result = await putItem(req.body as Todo)
//       ? res.status(200).send(JSON.stringify({ ok: true }))
//       : res.status(304).send(JSON.stringify({ ok: false }));
//   } catch (err) {
//     res.status(400).send({ error: `${(err as Error).message}` });
//     console.error(err);
//   }
// };

// export const delItems = async function (req: Request, res: Response) {
//   try {
//     const id = req.body.id;
//     const result = await deleteItem(req.body as Todo);

//     if (result && result.deletedCount) {
//       res.status(202).send(JSON.stringify({ ok: true }));
//     } else if (!result) {
//       res.status(400).send(JSON.stringify({ ok: false }));
//     } else if (!result.deletedCount) {
//       res.status(404).send(JSON.stringify({ ok: false }));
//     }
//   } catch (err) {
//     res.status(400).send({ error: `${(err as Error).message}` });
//     console.error(err);
//   }
// };


// async function createItem(item: Todo) {
//   if (item.checked === undefined) item.checked = false;
//   let collTodo = collections.user;
//   if (collTodo === undefined) { throw new Error('collTodo = undefined'); }
//   const chekTodo = await collTodo.findOne({ text: item.text });
//   return !chekTodo ? await collTodo.insertOne(item) : { insertedId: chekTodo._id };
// }

// async function putItem(item: Todo) {
//   const id = item.id;
//   const query = { _id: new ObjectId(id) };
//   const collTodo = collections.user;
//   if (collTodo === undefined) { throw new Error('collTodo = undefined'); }
//   return await collTodo.updateOne(query, { $set: item });
// }

// async function deleteItem(item: Todo) {
//   const id = item.id;
//   const query = { _id: new ObjectId(id) };
//   const collTodo = collections.user;
//   if (collTodo === undefined) { throw new Error('collTodo = undefined'); }
//   return await collTodo.deleteOne(query);
// }




// // todosRouter.put("/:id", async (req: Request, res: Response) => {
// //   const id = req?.params?.id;
// //   log(`/api/v1/items?putId=${id}`);
// //   try {
// //     const updatedTodo: Todo = req.body as Todo;
// //     const query = { _id: new ObjectId(id) };
// //     const collTodo = collections.todo;
// //     if (collTodo === undefined) { throw new Error('collTodo = undefined'); }
// //     const result = await collTodo.updateOne(query, { $set: updatedTodo });

// //     result
// //       ? res.status(200).send(JSON.stringify({ ok: 'true' }))
// //       : res.status(304).send(JSON.stringify({ ok: 'false' }));
// //     log(result ? `Successfully updated Todo with id ${id}` : `Todo with id: ${id} not updated`);

// //   } catch (error: any) {
// //     console.error(error.message);
// //     res.status(400).send(error.message);
// //     log(`error /api/v1/items?putId=${id}`);
// //   }
// // });

// // todosRouter.delete("/:id", async (req: Request, res: Response) => {
// //   const id = req?.params?.id;

// //   try {
// //     const query = { _id: new ObjectId(id) };
// //     const collTodo = collections.todo;
// //     if (collTodo === undefined) { throw new Error('collTodo = undefined'); }
// //     const result = await collTodo.deleteOne(query);

// //     if (result && result.deletedCount) {
// //       res.status(202).send(`Successfully removed Todo with id ${id}`);
// //     } else if (!result) {
// //       res.status(400).send(`Failed to remove Todo with id ${id}`);
// //     } else if (!result.deletedCount) {
// //       res.status(404).send(`Todo with id ${id} does not exist`);
// //     }
// //   } catch (error: any) {
// //     console.error(error.message);
// //     res.status(400).send(error.message);
// //   }
// // });
