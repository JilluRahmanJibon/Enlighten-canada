const mysql = require('mysql2/promise');

// Create the connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'JilluRahman27', // Use your MySQL password
  database: 'testdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
