const asyncHandler = require('express-async-handler')

// @desc      Get all motivation walls
// @route     GET /api/motivation_walls
// @access    Private
const getMotivationWalls = asyncHandler(async (req, res) => {
  const db = req.app.get('db');
  const sql = "SELECT * FROM MotivationWall";
  db.query(sql, (err, result) => {
    if (err) return res.json({ error: err });
    return res.json(result);
  });
});


// @desc      Get motivation wall by ID
// @route     GET /api/motivation_walls/:id
// @access    Private
const getMotivationWallById = asyncHandler(async (req, res) => {
  const motivationWallId = req.params.id;

  const db = req.app.get('db');
  const sql = "SELECT * FROM MotivationWall WHERE MWID = ?";
  const values = [motivationWallId];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500);
      throw new Error('Failed to get motivation wall.');
    }

    const motivationWall = result[0];

    if (!motivationWall) {
      res.status(404);
      throw new Error('Motivation wall not found.');
    }

    return res.json(motivationWall);
  });
});

// @desc      Create motivation wall
// @route     POST /api/motivation_walls
// @access    Private
const createMotivationWall = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const email = req.user.email;

  if (!name || !description) {
    res.status(400);
    throw new Error('Please provide both name and description fields.');
  }

  const db = req.app.get('db');
  const sql = 'INSERT INTO MotivationWall (email, name, description) VALUES (?, ?, ?)';
  const values = [email, name, description];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500);
      throw new Error('Failed to create motivation wall.');
    }

    return res.status(200).json({ message: 'Motivation wall added successfully.' });
  });
});

// @desc      Delete motivation wall
// @route     DELETE /api/motivation_wall/:id
// @access    Private
const deleteMotivationWall = asyncHandler(async (req, res) => {
  const motivationWallId = req.params.id;
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
    const sql_2 = "SELECT * FROM MotivationWall WHERE MWID = ? AND email = ?";
    db.query(sql_2, [motivationWallId, email], (err, result) => {
      if (err) {
        res.status(500);
        throw new Error('Failed to check motivation wall ownership.');
      }

      const motivationWallExists = result.length > 0;

      if (!motivationWallExists) {
        res.status(400);
        throw new Error('Motivational wall does not exist or you do not own it.');
      }

      // if user owns the exercise, delete exercise
      const sql_3 = 'DELETE FROM MotivationWall WHERE MWID = ?';
      const values = [motivationWallId];
      db.query(sql_3, values, (err, result) => {
        if (err) {
          res.status(500);
          throw new Error('Failed to delete motivation wall.');
        }

        return res.status(200).json({ message: 'Motivation wall deleted successfully.' });
      });
    });
  });
});

module.exports = {
  getMotivationWalls,
  getMotivationWallById,
  createMotivationWall,
  deleteMotivationWall
};
