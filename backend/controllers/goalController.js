const asyncHandler = require('express-async-handler')

// @desc      Get all of a users goals
// @route     GET /api/goals
// @access    Private
const getGoals = asyncHandler(async (req, res) => {
  const db = req.app.get('db');
  const email = req.user.email;
  const sql = "SELECT * FROM Goals WHERE email = ?";
  const values = [email];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ error: err });
    return res.json(result);
  });
});

// @desc      Create goal
// @route     POST /api/goals
// @access    Private
const createGoal = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const email = req.user.email;

  if (!name || !description) {
    res.status(400);
    throw new Error('Please provide both a goal name and description.');
  }

  const db = req.app.get('db');
  const sql = 'INSERT INTO Goals (email, name, description) VALUES (?, ?, ?)';
  const values = [email, name, description];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500);
      throw new Error('Failed to set goal.');
    }

    return res.status(200).json({ message: 'Goal added successfully.' });
  });
});

// @desc      Delete goal
// @route     DELETE /api/goals/:id
// @access    Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goalId = req.params.id;
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

    // if user exists, check if current user owns this goal
    const sql_2 = "SELECT * FROM Goals WHERE GID = ? AND email = ?";
    db.query(sql_2, [goalId, email], (err, result) => {
      if (err) {
        res.status(500);
        throw new Error('Failed to check goal ownership.');
      }

      const goalExists = result.length > 0;

      if (!goalExists) {
        res.status(400);
        throw new Error('Goal does not exist or you do not own it.');
      }

      // if user owns the goal, delete goal
      const sql_3 = 'DELETE FROM Goals WHERE GID = ?';
      const values = [goalId];

      db.query(sql_3, values, (err, result) => {
        if (err) {
          res.status(500);
          throw new Error('Failed to delete goal.');
        }

        return res.status(200).json({ message: 'Goal deleted successfully.' });
      });
    });
  });
});

module.exports = {
  getGoals,
  setGoal,
  deleteGoal
};
