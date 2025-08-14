const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'reservation_db',
  port: process.env.DB_PORT || 3307
});

db.connect(err => {
  if (err) {
    throw err;
    console.log(`mysql connected...`);
  };
});

module.exports = db