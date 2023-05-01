import fs from 'fs';
import s from 'child_process';
import { readJSON } from './file.service.js';

const spawn = s.spawn;

const dumpConfig = (await readJSON('src\\json\\dump.json')).mysqldump;

export function dumpDatabase() {

  console.log(new Date() + 'start dumpDatabase..');

  const dumpFileName = `dbDump/${Math.round(Date.now() / 1000)}.dump.sql`

  const writeStream = fs.createWriteStream(dumpFileName);

  const dump = spawn('mysqldump', dumpConfig,
    {
      cwd: 'C:/Program Files/MySQL/MySQL Server 8.0/bin/',
    });

  dump.stdout.pipe(writeStream);

  dump.on('finish', function () {
    console.log('Completed')
  });

  dump.on('error', function (err: Error) {
    console.log('Error dump DB: ' + err)
  });
}