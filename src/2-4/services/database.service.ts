// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { user?: mongoDB.Collection, todo?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase() {
  dotenv.config();
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
