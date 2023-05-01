import cron from 'node-cron';
import { sql } from "./query.servise.js";
import { dumpDatabase } from './mySqlDump.servise.js';

async function runMysqlDump() {
  console.log()
}

async function deleteBooks() {
  console.log(new Date() + 'start deleteBooks..');
  let booksForDel = await sql.getBooksForDel();
  booksForDel.map(async item => {
    if (item.softDelete < Date.now()) {
      console.log(`book id=${item.booksId} will be deleted`);
      await sql.delDataBook(item.booksId);
    } else {
      console.log(`book id=${item.booksId} pending deletion, ${Math.trunc(((item.softDelete - Date.now()) / 60000)) + 1}m`);
    }
  })
}


// cron config
const cronBD = cron.schedule('0 1 * * *', async () => {  // '0 1 * * *'
  try {
    dumpDatabase();
    deleteBooks();
  } catch (error) {
    console.error(error);
  }
});  // - every day at 01:00

const croneDelBooks = cron.schedule('0 * * * *', async () => {  // '0 * * * *'
  try {
  } catch (error) {
    console.error(error);
  }
}); // - every hour at 00 min

cronBD.on('error', (err: Error) => {
  console.error('Error with cron: ', err);
});

export const startCron = cronBD.start();
