// External Dependencies
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import dbInMemory from "./memory.service.js";
import fs from "fs";

const filePath: string = 'dataFiles';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataFileDir = path.join(__dirname, '..', filePath);

const fileUsers: string = path.join(dataFileDir, process.env.NAME_FILE_USERS ?? 'users.json');
const fileTodo: string = path.join(dataFileDir, process.env.NAME_FILE_TODO ?? 'todos.json');

// functions for reading/writing data to files
export default class dataFile {

  static async saveUsers() {
    const data = JSON.stringify(dbInMemory.getUsers());
    return await writeFileDB(fileUsers, data);
  }

  static async saveTodos() {
    const data = JSON.stringify(dbInMemory.getTodos());
    return await writeFileDB(fileTodo, data);
  }

  static async readUsers() {
    return JSON.parse(await readFileDB(fileUsers));
  }

  static async readTodo() {
    return JSON.parse(await readFileDB(fileTodo));
  }

}

async function writeFileDB(fileName: string, data: string): Promise<boolean> {
  try {
    await fs.promises.writeFile(fileName, data);
    return true;
  } catch (err) {
    console.log(`Error write file ${fileName}`);
    return false;
  }
}

async function readFileDB(fileName: string): Promise<string> {
  try {
    return await fs.promises.readFile(fileName, 'utf8');
  } catch (err) {
    console.log(`Error read file ${fileName}`);
    return '';
  }
}
