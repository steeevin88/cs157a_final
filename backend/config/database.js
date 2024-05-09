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

        // use JavaScript to populate the MotivationWall table with 1000 rows -- this is to prove indexing
        for (let i = 1; i <= 1000; i++) {
          const name = `Wall ${i}`;
          const description = `Description for Wall ${i}`;
          const sql = "INSERT INTO MotivationWall (email, name, description) VALUES ('ethan@gmail.com', ?, ?)";
    
          db.query(sql, [name, description], (err, result) => {
            if (err) {
              console.error('Error executing SQL query:', err);
              return;
            }
            // console.log('SQL query executed successfully'); // Commented out to reduce console.log noise
          });
        }

        // use JavaScript to populate a users Exercises with 1000 rows -- this is to prove indexing
        for (let i = 1; i <= 1000; i++) {
          const email = 'steven@gmail.com';
          const weight = '3 lbs';
          const repetitions = i;
          const date = new Date().toISOString().slice(0, 10);

          const sql = `
            INSERT INTO Records (email, EID, weight, repetitions, date)
            SELECT ?, E.EID, ?, ?, ?
            FROM Users U
            JOIN Exercises E ON U.email = E.email
            WHERE U.email = ?
              AND E.name = 'Bench Press'
          `;

          db.query(sql, [email, weight, repetitions, date, email], (err, result) => {
            if (err) {
              console.error('Error executing SQL query:', err);
              return;
            }
            // console.log('SQL query executed successfully');
          });

        }

        // use JavaScript to populate the Goals table with 1000 rows -- this is to prove indexing
        for (let i = 1; i <= 1000; i++) {
          const name = `Goal ${i}`;
          const description = `This is goal ${i}`;
          const sql = "INSERT INTO Goals (email, name, description) VALUES ('steven@gmail.com', ?, ?)";
    
          db.query(sql, [name, description], (err, result) => {
            if (err) {
              console.error('Error executing SQL query:', err);
              return;
            }
            // console.log('SQL query executed successfully'); // Commented out to reduce console.log noise
          });
        }

        // use JavaScript to populate the WorkoutRoutines table with 1000 rows -- this is to prove indexing
        for (let i = 1; i <= 1000; i++) {
          const email = 'steven@gmail.com';
          const name = `Workout ${i}`;
          const time = `${i} minutes`;
          const notes = `Notes for Workout ${i}`;
          const sql = "INSERT INTO WorkoutRoutines (email, name, time, notes) VALUES (?, ?, ?, ?)";

          db.query(sql, [email, name, time, notes], (err, result) => {
            if (err) {
              console.error('Error executing SQL query:', err);
              return;
            }
            // console.log('SQL query executed successfully'); // Commented out to reduce console.log noise
          });
        }
      } else {
        // Switch to the pr_tracker database
        db.changeUser({ database: 'pr_tracker' }, (err) => {
          if (err) {
            console.error('Error switching to database:', err);
            return;
          }
          console.log('The pr_tracker database has already been created; switching to it...');
        });
      }
    });
  });

  return db;
};

module.exports = connectDB;
