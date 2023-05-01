// External Dependencies
import fs from "fs";
import path from 'path';
import { __dirname } from '../app.config.js';

const filePath: string = 'sql';

const dataFileDir = path.join(__dirname, filePath);

// functions for reading/writing files
export default class sqlFile {

  static async getQuery(query: string) {
    const file: string = path.join(dataFileDir, (query + '.sql') ?? '');
    return await readFile(file);
  }

}

async function writeFile(fileName: string, data: string): Promise<boolean> {
  try {
    await fs.promises.writeFile(fileName, data);
    return true;
  } catch (err) {
    console.log(`Error write file ${fileName}`);
    return false;
  }
}

export async function readFile(fileName: string): Promise<string> {
  try {
    return await fs.promises.readFile(fileName, 'utf8');
  } catch (err) {
    console.log(`Error read file ${fileName}`);
    return '';
  }
}

export async function readJSON(fileName: string) {
  try {
    const f = await fs.promises.readFile(fileName);
    return JSON.parse(f.toString());
  } catch (err) {
    console.log(`Error read file ${fileName}`);
    return '';
  }
}
