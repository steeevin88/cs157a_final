const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide all fields');
  };

  const db = req.app.get('db');

  // check if user exists
  const sql = "SELECT * FROM Users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) return res.json({ error: err });
    const userExists = result.length > 0;

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  });

  // hash password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const encrypted = await bcrypt.hash(password, salt);

  // insert user into db
  const insertSql = "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)";
  const result = db.query(insertSql, [name, email, encrypted]);

  if (result) {
    res.status(201).json({message: 'User created successfully'});
  } else {
    res.status(500);
    throw new Error('Failed to create user');
  }
});

// @desc   Authenticate a user
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  res.json({message: 'Login user'});
});

// @desc   Get user data
// @route  GET /api/users/me
// @access Public
const getUser = asyncHandler(async (req, res) => {
  res.json({message: 'user data'});
});

module.exports = { registerUser, loginUser, getUser };
