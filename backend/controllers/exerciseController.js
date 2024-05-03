const asyncHandler = require('express-async-handler')

// @desc      Get all exercises
// @route     GET /api/exercises
// @access    Private
const getExercises = asyncHandler(async (req, res) => {
  const db = req.app.get('db');
  const sql = "SELECT * FROM exercises";
  db.query(sql, (err, result) => {
    if (err) return res.json({ error: err });
    return res.json(result);
  });
});

// @desc      Set exercise
// @route     POST /api/exercises
// @access    Private
const setExercise = asyncHandler(async (req, res) => {
  const { name, muscle_group } = req.body;

  if (!name || !muscle_group) {
    res.status(400);
    throw new Error('Please provide both name and muscle_group fields');
  }

  const db = req.app.get('db');
  const sql = 'INSERT INTO Exercises (name, muscle_group) VALUES (?, ?)';
  const values = [name, muscle_group];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500);
      throw new Error('Failed to set exercise');
    }

    return res.status(200).json({ message: 'Exercise added successfully!' });
  });
});

// @desc      Update exercise
// @route     PUT /api/exercises/:id
// @access    Private
const updateExercise = asyncHandler(async (req, res) => {
  const { name, muscle_group } = req.body;
  const exerciseId = req.params.id;

  if (!name || !muscle_group) {
    res.status(400);
    throw new Error('Please provide both name and muscle_group fields');
  }

  const db = req.app.get('db');
  const sql = 'UPDATE Exercises SET name = ?, muscle_group = ? WHERE EID = ?';
  const values = [name, muscle_group, exerciseId];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500);
      throw new Error('Failed to update exercise');
    }

    return res.status(200).json({ message: 'Exercise updated successfully!' });
  });
});

// @desc      Delete exercise
// @route     DELETE /api/exercises/:id
// @access    Private
const deleteExercise = asyncHandler(async (req, res) => {
  const exerciseId = req.params.id;

  const db = req.app.get('db');
  const sql = 'DELETE FROM Exercises WHERE EID = ?';
  const values = [exerciseId];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500);
      throw new Error('Failed to delete exercise');
    }

    return res.status(200).json({ message: 'Exercise deleted successfully!' });
  });
});

module.exports = {
  getExercises,
  setExercise,
  updateExercise,
  deleteExercise
};
