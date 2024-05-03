const mysql = require('mysql2');

const connectDB = () => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'pr_tracker',
  });

  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });

  return db;
};

module.exports = connectDB;
