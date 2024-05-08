const asyncHandler = require('express-async-handler')

// @desc      Get all exercises
// @route     GET /api/exercises
// @access    Private
const getExercises = asyncHandler(async (req, res) => {
  const db = req.app.get('db');
  const email = req.user.email;
  const sql = "SELECT * FROM exercises WHERE email = ?";
  const values = [email];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ error: err });
    return res.json(result);
  });
});

// @desc      Get exercise by ID
// @route     GET /api/exercises/:id
// @access    Private
const getExerciseById = asyncHandler(async (req, res) => {
  const exerciseId = req.params.id;
  const email = req.user.email;

  const db = req.app.get('db');
  const sql = "SELECT * FROM exercises WHERE EID = ? AND email = ?";
  const values = [exerciseId, email];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500);
      throw new Error('Failed to get exercise.');
    }

    const exercise = result[0];

    if (!exercise) {
      res.status(404);
      throw new Error('Exercise not found or you do not own it.');
    }

    return res.json(exercise);
  });
});

// @desc      Create exercise
// @route     POST /api/exercises
// @access    Private
const createExercise = asyncHandler(async (req, res) => {
  const { name, muscle_group } = req.body;
  const email = req.user.email;

  if (!name || !muscle_group) {
    res.status(400);
    throw new Error('Please provide both name and muscle_group fields.');
  }

  const db = req.app.get('db');
  const sql = 'INSERT INTO Exercises (email, name, muscle_group) VALUES (?, ?, ?)';
  const values = [email, name, muscle_group];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500);
      throw new Error('Failed to create exercise.');
    }

    return res.status(200).json({ message: 'Exercise added successfully.' });
  });
});

// @desc      Delete exercise
// @route     DELETE /api/exercises/:id
// @access    Private
const deleteExercise = asyncHandler(async (req, res) => {
  const exerciseId = req.params.id;
  const email = req.user.email;

  const db = req.app.get('db');

  // check if user exists
  const sql_1 = "SELECT * FROM Users WHERE email = ?";
  db.query(sql_1, [email], (err, result) => {
    if (err) {
      res.status(500);
      throw new Error('Failed to check user.');
    }

    const userExists = result.length > 0;

    if (!userExists) {
      res.status(400);
      throw new Error('User does not exist.');
    }

    // if user exists, check if current user owns this exercise
    const sql_2 = "SELECT * FROM Exercises WHERE EID = ? AND email = ?";
    db.query(sql_2, [exerciseId, email], (err, result) => {
      if (err) {
        res.status(500);
        throw new Error('Failed to check exercise ownership.');
      }

      const exerciseExists = result.length > 0;

      if (!exerciseExists) {
        res.status(400);
        throw new Error('Exercise does not exist or you do not own it.');
      }

      // if user owns the exercise, delete exercise
      const sql_3 = 'DELETE FROM Exercises WHERE EID = ?';
      const values = [exerciseId];

      db.query(sql_3, values, (err, result) => {
        if (err) {
          res.status(500);
          throw new Error('Failed to delete exercise.');
        }

        return res.status(200).json({ message: 'Exercise deleted successfully!' });
      });
    });
  });
});

module.exports = {
  getExercises,
  getExerciseById,
  createExercise,
  deleteExercise
};
