import mysql from "mysql2";
import { Pool } from "mysql2/promise";
import { startCron } from "./cronTask.servise.js";
import { readJSON } from "./file.service.js";
"./cronTask.servise.js";

const dataBaseSettings = await readJSON('src\\json\\dbConnection.json');

// Global Variables
export let dbCollection: Pool;

export async function preparedStart() {
  const pool = mysql.createPool(dataBaseSettings);
  dbCollection = pool.promise();
  startCron;
}