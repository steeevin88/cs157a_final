const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

const connectDB = () => {
  // Read the SQL script file
  const sqlScriptPath = path.join(__dirname, '../../createdb.sql');
  const sqlScript = fs.readFileSync(sqlScriptPath, 'utf8');
  const queries = sqlScript.split(';').map(query => query.trim()).filter(Boolean);

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
  });

  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database');

    // Check if the database exists
    db.query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'pr_tracker'", (err, result) => {
      if (err) {
        console.error('Error checking if database exists:', err);
        return;
      }

      if (result.length === 0) {
        console.log('pr_tracker not found, creating database + tables...');

        // Execute the SQL script
        queries.forEach((query) => {
          db.query(query, (err, result) => {
            if (err) {
              console.error('Error executing SQL query:', err);
              return;
            }
            console.log('SQL query executed successfully');
          });
        });
      } else {
        // Switch to the pr_tracker database
        db.changeUser({ database: 'pr_tracker' }, (err) => {
          if (err) {
            console.error('Error switching to database:', err);
            return;
          }
          console.log('Switched to pr_tracker database');
        });
      }
    });
  });

  return db;
};

module.exports = connectDB;
