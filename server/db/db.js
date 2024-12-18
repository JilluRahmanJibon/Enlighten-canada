const mysql = require('mysql2/promise');

// Create the connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'JilluRahman27', // Use your MySQL password
  database: 'mysql',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
// const pool = mysql.createPool({
//   host: '127.0.0.1',
//   user: 'idiavnjx_node_user',
//   password: '@AdminDB27', // Your MySQL password
//   database: 'idiavnjx_node_mysql',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

module.exports = pool;
