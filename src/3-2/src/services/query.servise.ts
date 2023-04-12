// import mysql from "mysql2";

// const dbConnection = await mysql.createConnection({
//   host: "127.0.0.1",
//   user: "user",
//   database: "shpptestbooksdb",
//   password: "user"
// });
// dbConnection.connect(function (err) {
//   if (err) {
//     return console.error("Ошибка: " + err.message);
//   }
//   else {
//     console.log("Подключение к серверу MySQL успешно установлено");
//   }
// });

// // create the pool
// const pool = mysql.createPool({ host: 'localhost', user: 'root', database: 'test' });
// // now get a Promise wrapped instance of that pool
// const promisePool = pool.promise();