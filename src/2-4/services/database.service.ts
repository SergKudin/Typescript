// External Dependencies
import * as mongoDB from "mongodb";
import Todo from "../Models/todo.js";
import { ObjectId } from "mongodb";

// Global Variables
export const collections: { user?: mongoDB.Collection, todo?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase() {
  const dbConnString: string = process.env.DB_CONN_STRING ? process.env.DB_CONN_STRING : 'no url for connection';
  const dataCollectionName: string = process.env.DATA_COLLECTION_NAME ? process.env.DATA_COLLECTION_NAME : 'no neme data DB for connection';
  const usersCollectionName: string = process.env.USERS_COLLECTION_NAME ? process.env.USERS_COLLECTION_NAME : 'no neme users DB for connection';
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbConnString);
  await client.connect();
  const db: mongoDB.Db = client.db(process.env.DB_NAME);
  const todosCollection: mongoDB.Collection = db.collection(dataCollectionName);
  const usersCollection: mongoDB.Collection = db.collection(usersCollectionName);
  collections.user = usersCollection;
  collections.todo = todosCollection;
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${todosCollection.collectionName}`);
}

// functions for working with the database
export async function findOneUserDB(login: string) {
  let collUser = collections.user;
  if (collUser === undefined) { throw new Error('no connect DB'); }
  return await collUser.findOne({ autUser: login });
}

export async function insertOneUserDB(login: string, pass: string) {
  let collUser = collections.user;
  if (collUser === undefined) { throw new Error('no connect DB'); }
  return await collUser.insertOne({ autUser: login, autPass: pass });
}

export async function getAllTodosDB(user: string) {
  const collTodo = collections.todo;
  if (!collTodo) { throw new Error('no connect DB'); }
  const todos = (await collTodo.find({ user: user }).toArray()) as unknown as Todo[];
  todos.map(todo => todo['id'] = `${todo._id}`);
  return todos;
}

export async function findOneTodoDB(user: string, todo: string) {
  let collTodo = collections.todo;
  if (!collTodo) { throw new Error('no connect DB'); }
  return await collTodo.findOne({ user: user, text: todo });
}

export async function insertOneTodoDB(todo: Todo) {
  let collTodo = collections.todo;
  if (!collTodo) { throw new Error('no connect DB'); }
  return await collTodo.insertOne(todo);
}

export async function updateOneTodoDB(user: string, todo: Todo) {
  const query = { user: user, _id: new ObjectId(todo.id) };
  todo.user = user;
  const collTodo = collections.todo;
  if (!collTodo) { throw new Error('no connect DB'); }
  return await collTodo.updateOne(query, { $set: todo });
}

export async function deleteOneTodoDB(user: string, todoID: string) {
  const query = { user: user, _id: new ObjectId(todoID) };
  const collTodo = collections.todo;
  if (!collTodo) { throw new Error('no connect DB'); }
  return await collTodo.deleteOne(query);
}

