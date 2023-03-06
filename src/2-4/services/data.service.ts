import { ObjectId } from "mongodb";
import Todo from "../Models/todo.js";
import { collections } from "../services/database.service.js";
import dataFile from "./file.service.js";
import dbInMemory from "./memory.service.js";


export async function findOneUser(login: string) {
  if (process.env.SAVE_DATA_IN_DB === 'true') {
    return await findOneUserDB(login);
  } else {
    return await dbInMemory.findOneUserMemory(login);
  }
}

export async function insertOneUser(login: string, pass: string) {
  if (process.env.SAVE_DATA_IN_DB === 'true') {
    return await insertOneUserDB(login, pass);
  } else {
    const statusOp = await dbInMemory.insertOneUserMemory(login, pass);
    if (process.env.SAVE_DATA_IN_FILE === 'true') {
      dataFile.saveUsers();
    }
    return statusOp;
  }
}

export async function getAllTodos(user: string) {
  if (process.env.SAVE_DATA_IN_DB === 'true') {
    return await getAllTodosDB(user);
  } else {
    return await dbInMemory.getAllTodosMemory(user);
  }
}

export async function findOneTodo(user: string, todo: string) {
  if (process.env.SAVE_DATA_IN_DB === 'true') {
    return await findOneTodoDB(user, todo);
  } else {
    return await dbInMemory.findOneTodoMemory(user, todo);
  }
}

export async function insertOneTodo(todo: Todo) {
  if (process.env.SAVE_DATA_IN_DB === 'true') {
    return await insertOneTodoDB(todo);
  } else {
    const statusOp = await dbInMemory.insertOneTodoMemory(todo);
    if (process.env.SAVE_DATA_IN_FILE === 'true') {
      dataFile.saveTodos();
    }
    return statusOp;
  }
}

export async function updateOneTodo(user: string, todo: Todo) {
  if (process.env.SAVE_DATA_IN_DB === 'true') {
    return await updateOneTodoDB(user, todo);
  } else {
    const statusOp = await dbInMemory.updateOneTodoMemory(user, todo);
    if (process.env.SAVE_DATA_IN_FILE === 'true') {
      dataFile.saveTodos();
    }
    return statusOp;
  }
}

export async function deleteOneTodo(user: string, todoID: string) {
  if (process.env.SAVE_DATA_IN_DB === 'true') {
    return await deleteOneTodoDB(user, todoID);
  } else {
    const statusOp = await dbInMemory.deleteOneTodoMemory(user, todoID);
    if (process.env.SAVE_DATA_IN_FILE === 'true') {
      dataFile.saveTodos();
    }
    return statusOp;
  }
}


// functions for working with the database
async function findOneUserDB(login: string) {
  let collUser = collections.user;
  if (collUser === undefined) { throw new Error('no connect DB'); }
  return await collUser.findOne({ autUser: login });
}

async function insertOneUserDB(login: string, pass: string) {
  let collUser = collections.user;
  if (collUser === undefined) { throw new Error('no connect DB'); }
  return await collUser.insertOne({ autUser: login, autPass: pass });
}

async function getAllTodosDB(user: string) {
  const collTodo = collections.todo;
  if (!collTodo) { throw new Error('no connect DB'); }
  const todos = (await collTodo.find({ user: user }).toArray()) as unknown as Todo[];
  todos.map(todo => todo['id'] = `${todo._id}`);
  return todos;
}

async function findOneTodoDB(user: string, todo: string) {
  let collTodo = collections.todo;
  if (!collTodo) { throw new Error('no connect DB'); }
  return await collTodo.findOne({ user: user, text: todo });
}

async function insertOneTodoDB(todo: Todo) {
  let collTodo = collections.todo;
  if (!collTodo) { throw new Error('no connect DB'); }
  return await collTodo.insertOne(todo);
}

async function updateOneTodoDB(user: string, todo: Todo) {
  const query = { user: user, _id: new ObjectId(todo.id) };
  todo.user = user;
  const collTodo = collections.todo;
  if (!collTodo) { throw new Error('no connect DB'); }
  return await collTodo.updateOne(query, { $set: todo });
}

async function deleteOneTodoDB(user: string, todoID: string) {
  const query = { user: user, _id: new ObjectId(todoID) };
  const collTodo = collections.todo;
  if (!collTodo) { throw new Error('no connect DB'); }
  return await collTodo.deleteOne(query);
}

