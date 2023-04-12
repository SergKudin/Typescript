import mysql from "mysql2";
import { Pool } from "mysql2/promise";

const dataBaseSettings = {
  host: "127.0.0.1",
  user: "user",
  database: "shpptestbooksdb",
  password: "user"
};

// Global Variables
export let dbCollection: Pool;

export async function preparedStart() {
  const pool = mysql.createPool(dataBaseSettings);
  dbCollection = pool.promise();
}