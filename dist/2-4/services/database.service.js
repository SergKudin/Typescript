import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
export const collections = {};
export async function connectToDatabase() {
    dotenv.config();
    const dbConnString = process.env.DB_CONN_STRING ? process.env.DB_CONN_STRING : 'no url for connection';
    const collectionName = process.env.COLLECTION_NAME ? process.env.COLLECTION_NAME : 'no neme DB for connection';
    const client = new mongoDB.MongoClient(dbConnString);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const todosCollection = db.collection(collectionName);
    collections.todo = todosCollection;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${todosCollection.collectionName}`);
}
//# sourceMappingURL=database.service.js.map