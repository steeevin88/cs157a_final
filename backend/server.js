const express = require('express');
const mysql = require('mysql2'); 
const cors = require('cors');
require('dotenv').config(); // this is for environment variables

const app = express();

app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'pr_tracker_application',
});

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
      if (err) return res.json({ error: err });
      return res.json(result);
    });
});

app.get('/', (req, res) => {
    return res.json({ message: 'Hello World' });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});