import dbInMemory from "./memory.service.js";
import fs, { writeFile } from "fs";
import path from "path";

const filePath: string = '../dataFiles';
const fileUsers: string = process.env.NAME_FILE_USERS ?? 'users.json';
const fileTodo: string = process.env.NAME_FILE_TODO ?? 'todos.json';

export default class dataFile {

  static async saveUsers() {
    const data = JSON.stringify(dbInMemory.getUsers());
    return await writeFileDB(fileUsers, data);
  }

  static async saveTodos() {
    const data = JSON.stringify(dbInMemory.getTodos());
    return await writeFileDB(fileTodo, data);
  }

  static readUsers() {
    return readFileDB(fileUsers);
  }

  static readTodo() {
    return readFileDB(fileTodo);
  }

}

async function writeFileDB(fileName: string, data: string): Promise<boolean> {
  try {
    console.log(`file write = ` + path.join(__dirname, filePath, fileName));

    await fs.promises.writeFile(path.join(__dirname, filePath, fileName), data);
    return true;
  } catch (err) {
    console.log(`Error write file ${fileName}`);
    return false;
  }
}

async function readFileDB(fileName: string): Promise<string> {
  try {
    console.log(`file read = ` + path.join(__dirname, filePath, fileName));

    return await fs.promises.readFile(path.join(__dirname, filePath, fileName), 'utf8');
  } catch (err) {
    console.log(`Error read file ${fileName}`);
    return '';
  }
}
