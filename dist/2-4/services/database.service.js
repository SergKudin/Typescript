import * as mongoDB from "mongodb";
import { ObjectId } from "mongodb";
export const collections = {};
export async function connectToDatabase() {
    const dbConnString = process.env.DB_CONN_STRING ? process.env.DB_CONN_STRING : 'no url for connection';
    const dataCollectionName = process.env.DATA_COLLECTION_NAME ? process.env.DATA_COLLECTION_NAME : 'no neme data DB for connection';
    const usersCollectionName = process.env.USERS_COLLECTION_NAME ? process.env.USERS_COLLECTION_NAME : 'no neme users DB for connection';
    const client = new mongoDB.MongoClient(dbConnString);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const todosCollection = db.collection(dataCollectionName);
    const usersCollection = db.collection(usersCollectionName);
    collections.user = usersCollection;
    collections.todo = todosCollection;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${todosCollection.collectionName}`);
}
export async function findOneUserDB(login) {
    let collUser = collections.user;
    if (collUser === undefined) {
        throw new Error('no connect DB');
    }
    return await collUser.findOne({ autUser: login });
}
export async function insertOneUserDB(login, pass) {
    let collUser = collections.user;
    if (collUser === undefined) {
        throw new Error('no connect DB');
    }
    return await collUser.insertOne({ autUser: login, autPass: pass });
}
export async function getAllTodosDB(user) {
    const collTodo = collections.todo;
    if (!collTodo) {
        throw new Error('no connect DB');
    }
    const todos = (await collTodo.find({ user: user }).toArray());
    todos.map(todo => todo['id'] = `${todo._id}`);
    return todos;
}
export async function findOneTodoDB(user, todo) {
    let collTodo = collections.todo;
    if (!collTodo) {
        throw new Error('no connect DB');
    }
    return await collTodo.findOne({ user: user, text: todo });
}
export async function insertOneTodoDB(todo) {
    let collTodo = collections.todo;
    if (!collTodo) {
        throw new Error('no connect DB');
    }
    return await collTodo.insertOne(todo);
}
export async function updateOneTodoDB(user, todo) {
    const query = { user: user, _id: new ObjectId(todo.id) };
    todo.user = user;
    const collTodo = collections.todo;
    if (!collTodo) {
        throw new Error('no connect DB');
    }
    return await collTodo.updateOne(query, { $set: todo });
}
export async function deleteOneTodoDB(user, todoID) {
    const query = { user: user, _id: new ObjectId(todoID) };
    const collTodo = collections.todo;
    if (!collTodo) {
        throw new Error('no connect DB');
    }
    return await collTodo.deleteOne(query);
}
//# sourceMappingURL=database.service.js.map