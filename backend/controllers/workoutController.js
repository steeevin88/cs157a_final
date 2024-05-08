const asyncHandler = require('express-async-handler')

// @desc      Get all workouts
// @route     GET /api/workouts
// @access    Private
const getWorkouts = asyncHandler(async (req, res) => {
  const db = req.app.get('db');
  const email = req.user.email;
  const sql = "SELECT * FROM WorkoutRoutines WHERE email = ?";
  const values = [email];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ error: err });
    return res.json(result);
  });
});

// @desc      Get workout by ID
// @route     GET /api/workouts/:id
// @access    Private
const getWorkoutById = asyncHandler(async (req, res) => {
  const workoutId = req.params.id;
  const email = req.user.email;

  const db = req.app.get('db');
  const sql = "SELECT * FROM WorkoutRoutines WHERE WID = ? AND email = ?";
  const values = [workoutId, email];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500);
      throw new Error('Failed to get workout.');
    }

    const workout = result[0];

    if (!workout) {
      res.status(404);
      throw new Error('Workout not found or you do not own it.');
    }

    return res.json(workout);
  });
});

// @desc      Create workout
// @route     POST /api/workouts
// @access    Private
const createWorkout = asyncHandler(async (req, res) => {
  const { name, time, notes } = req.body;
  const email = req.user.email;

  if (!name || !time || !notes) {
    res.status(400);
    throw new Error('Please provide both name, time, and notes fields.');
  }

  const db = req.app.get('db');
  const sql = 'INSERT INTO WorkoutRoutines (email, name, time, notes) VALUES (?, ?, ?, ?)';
  const values = [email, name, time, notes];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500);
      throw new Error('Failed to create workout.');
    }

    return res.status(200).json({ message: 'Workout added successfully.' });
  });
});

// @desc      Delete workout
// @route     DELETE /api/workouts/:id
// @access    Private
const deleteWorkout = asyncHandler(async (req, res) => {
  const workoutId = req.params.id;
  const email = req.user.email;

  const db = req.app.get('db');

  // check if user exists
  const sql_1 = "SELECT * FROM Users WHERE email = ?";
  db.query(sql_1, [email], (err, result) => {
    if (err) {
      res.status(500);
      throw new Error('Failed to check user');
    }

    const userExists = result.length > 0;

    if (!userExists) {
      res.status(400);
      throw new Error('User does not exist');
    }

    // if user exists, check if current user owns this workout
    const sql_2 = "SELECT * FROM WorkoutRoutines WHERE WID = ? AND email = ?";
    db.query(sql_2, [workoutId, email], (err, result) => {
      if (err) {
        res.status(500);
        throw new Error('Failed to check workout ownership.');
      }

      const workoutExists = result.length > 0;

      if (!workoutExists) {
        res.status(400);
        throw new Error('Workout does not exist or you do not own it.');
      }

      // if user owns the workout, delete workout
      const sql_3 = 'DELETE FROM WorkoutRoutines WHERE WID = ?';
      const values = [workoutId];

      db.query(sql_3, values, (err, result) => {
        if (err) {
          res.status(500);
          throw new Error('Failed to delete workout.');
        }

        return res.status(200).json({ message: 'Workout deleted successfully!' });
      });
    });
  });
});

module.exports = {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  deleteWorkout
};
