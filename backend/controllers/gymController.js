const asyncHandler = require('express-async-handler')

// @desc      Get all of a users gyms
// @route     GET /api/gyms
// @access    Public
const getGyms = asyncHandler(async (req, res) => {
  const db = req.app.get('db');
  const sql = "SELECT * FROM Location";
  db.query(sql, (err, result) => {
    if (err) return res.json({ error: err });
    return res.json(result);
  });
});

// @desc      Create gym
// @route     POST /api/gyms
// @access    Private
const createGym = asyncHandler(async (req, res) => {
  const { name, address } = req.body;
  const email = req.user.email;
  console.log(name + " " + address)

  if (!name || !address) {
    res.status(400);
    throw new Error('Please provide both a gym name and address.');
  }

  const db = req.app.get('db');
  const sql = 'INSERT INTO Location (email, name, address) VALUES (?, ?, ?)';
  const values = [email, name, address];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500);
      throw new Error('Failed to set gym.');
    }

    return res.status(200).json({ message: 'Gym added successfully.' });
  });
});

// @desc      Delete gym
// @route     DELETE /api/gyms/:id
// @access    Private
const deleteGym = asyncHandler(async (req, res) => {
  const locationID = req.params.id;
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

    // if user exists, check if current user owns this location
    const sql_2 = "SELECT * FROM Location WHERE LID = ? AND email = ?";
    db.query(sql_2, [locationID, email], (err, result) => {
      if (err) {
        res.status(500);
        throw new Error('Failed to check location ownership.');
      }

      const locationExists = result.length > 0;

      if (!locationExists) {
        res.status(400);
        throw new Error('Location does not exist or you do not own it.');
      }

      // if user owns the location, delete location
      const sql_3 = 'DELETE FROM Location WHERE LID = ?';
      const values = [locationID];

    //   db.query(sql_3, values, (err, result) => {
    //     if (err) {
    //       res.status(500);
    //       throw new Error('Failed to delete location.');
    //     }

    //     return res.status(200).json({ message: 'Location deleted successfully.' });
    //   });
    });
  });
});

module.exports = {
  getGyms,
  createGym,
  deleteGym
};
