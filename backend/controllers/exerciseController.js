const asyncHandler = require('express-async-handler')

// @desc      Get all exercises
// @route     GET /api/exercises
// @access    Private
const getExercises = asyncHandler(async (req, res) => {
  const db = req.app.get('db');
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) return res.json({ error: err });
    return res.json(result);
  });
});

// @desc      Set exercise
// @route     POST /api/exercises
// @access    Private
const setExercise = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  return res.status(200).json({ message: 'Set exercise' });
});

// @desc      Update exercise
// @route     PUT /api/exercises/:id
// @access    Private
const updateExercise = asyncHandler(async (req, res) => {

});

// @desc      Delete exercise
// @route     DELETE /api/exercises/:id
// @access    Private
const deleteExercise = asyncHandler(async (req, res) => {

});


module.exports = {
  getExercises,
  setExercise,
  updateExercise,
  deleteExercise
};
