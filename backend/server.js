const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config({ path: '../.env' }); // this is for environment variables

const app = express();

const db = connectDB();   // establish connection to local MySQL database
app.set('db', db);        // make db instance available to the app

app.use(cors());
app.use('/api/exercises', require('./routes/exerciseRoutes'));

app.get('/', (req, res) => {
    return res.json({ message: 'Hello World' });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});