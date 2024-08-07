const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { errorHandler } = require('./middleware/errorMiddleware');
require('dotenv').config({ path: './.env' }); // this is for environment variables

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
app.use('/api/records', require('./routes/recordRoutes'));
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/gyms', require('./routes/gymRoutes'));
app.use('/api/motivation_walls', require('./routes/motivationWallRoutes'));
app.use('/api/messages', require('./routes/motivationWallMessageRoutes'));
app.use('/api/workouts', require('./routes/workoutRoutes'));
app.use('/api/workout_exercises', require('./routes/workoutExercisesRoutes'));

app.listen(8000, () => {console.log(`Server is running on port 8000`)});
