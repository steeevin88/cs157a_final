const asyncHandler = require('express-async-handler')

// @desc      Get all records
// @route     GET /api/records
// @access    Private
const getRecords = asyncHandler(async (req, res) => {
  const db = req.app.get('db');
  const exercise_id = req.params.id;
  const email = req.user.email;
  const sql = "SELECT * FROM Records WHERE email = ? AND EID = ?";
  const values = [email, exercise_id];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ error: err });
    return res.json(result);
  });
});

// @desc      Set record
// @route     POST /api/records
// @access    Private
const setRecord = asyncHandler(async (req, res) => {
  const { weight, repetitions, exercise_id } = req.body;
  const email = req.user.email;

  if (!weight || !repetitions) {
    res.status(400);
    throw new Error('Please provide weight and repetitions fields');
  }

  const db = req.app.get('db');
  const sql = 'INSERT INTO Records (email, EID, weight, repetitions, date) VALUES (?, ?, ?, ?, CURDATE())';
  const values = [email, parseInt(exercise_id), weight, parseInt(repetitions)];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500);
      console.log(err);
      throw new Error('Failed to set record');
    }

    return res.status(200).json({ message: 'Record added successfully!' });
  });
});

// @desc      Delete record
// @route     DELETE /api/records/:id
// @access    Private
const deleteRecord = asyncHandler(async (req, res) => {
  const recordId = req.params.id;
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

    // if user exists, check if current user owns this exercise
    const sql_2 = "SELECT * FROM Records WHERE RID = ? AND email = ?";
    db.query(sql_2, [recordId, email], (err, result) => {
      if (err) {
        res.status(500);
        throw new Error('Failed to check exercise ownership');
      }

      const recordExists = result.length > 0;

      if (!recordExists) {
        res.status(400);
        throw new Error('Record does not exist or you do not own it');
      }

      // if user owns the exercise, delete exercise
      const sql_3 = 'DELETE FROM Records WHERE RID = ?';
      const values = [recordId];

      db.query(sql_3, values, (err, result) => {
        if (err) {
          res.status(500);
          throw new Error('Failed to delete record');
        }

        return res.status(200).json({ message: 'Record deleted successfully!' });
      });
    });
  });
});

module.exports = {
  getRecords,
  setRecord,
  deleteRecord
};
