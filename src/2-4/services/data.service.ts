import Todo from "../Models/todo.js";
import { connectToDatabase, deleteOneTodoDB, findOneTodoDB, findOneUserDB, getAllTodosDB, insertOneTodoDB, insertOneUserDB, updateOneTodoDB } from "../services/database.service.js";
import dataFile from "./file.service.js";
import dbInMemory from "./memory.service.js";

export async function preparedStart() {
  if (process.env.SAVE_DATA_IN_DB === 'true') {
    console.log(`Work mongoDB`);
    return await connectToDatabase();
  } else if (process.env.SAVE_DATA_IN_FILE === 'true') {
    console.log(`Work DB in file`);
    dbInMemory.setUsersData(await dataFile.readUsers());
    dbInMemory.setTodosData(await dataFile.readTodo());
  }
  console.log(`Work DB in memory`);
}

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


