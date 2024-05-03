const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { errorHandler } = require('./middleware/errorMiddleware');
require('dotenv').config({ path: '../.env' }); // this is for environment variables

const app = express();

// connect to database + make db instance available to the app
const db = connectDB();
app.set('db', db);

// middleware --> cors, json, urlencoded, errorHandler
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

// routes
app.use('/api/exercises', require('./routes/exerciseRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.listen(8000, () => {console.log(`Server is running on port 8000`)});
