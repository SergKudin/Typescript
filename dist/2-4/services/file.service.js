var _a, _b;
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import dbInMemory from "./memory.service.js";
import fs from "fs";
const filePath = '../dataFiles';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataFileDir = path.join(__dirname, filePath);
const fileUsers = path.join(dataFileDir, (_a = process.env.NAME_FILE_USERS) !== null && _a !== void 0 ? _a : 'users.json');
const fileTodo = path.join(dataFileDir, (_b = process.env.NAME_FILE_TODO) !== null && _b !== void 0 ? _b : 'todos.json');
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
async function writeFileDB(fileName, data) {
    try {
        await fs.promises.writeFile(fileName, data);
        return true;
    }
    catch (err) {
        console.log(`Error write file ${fileName}`);
        return false;
    }
}
async function readFileDB(fileName) {
    try {
        return await fs.promises.readFile(fileName, 'utf8');
    }
    catch (err) {
        console.log(`Error read file ${fileName}`);
        return '';
    }
}
//# sourceMappingURL=file.service.js.map