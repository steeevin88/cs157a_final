const asyncHandler = require('express-async-handler')

// @desc      Get all exercises belonging to a workout
// @route     GET /api/workout_exercises/:id
// @access    Private
const getWorkoutExercises = asyncHandler(async (req, res) => {
  const workoutId = req.params.id;
  const db = req.app.get('db');
  const sql = `
    SELECT Exercises.*
    FROM WorkoutRoutineExercises
    JOIN Exercises ON WorkoutRoutineExercises.EID = Exercises.EID
    WHERE WorkoutRoutineExercises.WID = ?
  `;
  const values = [workoutId];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ error: err });
    return res.json(result);
  });
});

// @desc      Add an exercise to a workout
// @route     GET /api/workout_exercises/:id
// @access    Private
const addWorkoutExercise = asyncHandler(async (req, res) => {
  const workoutId = req.params.id;
  const db = req.app.get('db');
  const sql = `
    INSERT INTO WorkoutRoutineExercises (WID, EID)
    VALUES (?, ?)
  `;
  const values = [workoutId, req.body.EID];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ error: err });
    return res.json(result);
  });
});

// @desc      Delete an exercise from a workout
// @route     DELETE /api/workout_exercises/:id
// @access    Private
const deleteWorkoutExercise = asyncHandler(async (req, res) => {
  const [WID, EID] = req.params.id.split('_');
  const db = req.app.get('db');
  const sql = `
    DELETE FROM WorkoutRoutineExercises
    WHERE WID = ? AND EID = ?
  `;
  const values = [WID, EID];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ error: err });
    return res.json(result);
  });
});

module.exports = {
  getWorkoutExercises,
  addWorkoutExercise,
  deleteWorkoutExercise
};
