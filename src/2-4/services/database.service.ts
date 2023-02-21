// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
// import { env } from 'process';

// Global Variables
export const collections: { todo?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase() {
  dotenv.config();
  const dbConnString: string = process.env.DB_CONN_STRING ? process.env.DB_CONN_STRING : 'no url for connection';
  const collectionName: string = process.env.COLLECTION_NAME ? process.env.COLLECTION_NAME : 'no neme DB for connection';
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbConnString);
  await client.connect();
  const db: mongoDB.Db = client.db(process.env.DB_NAME);
  const todosCollection: mongoDB.Collection = db.collection(collectionName);
  collections.todo = todosCollection;
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${todosCollection.collectionName}`);
}