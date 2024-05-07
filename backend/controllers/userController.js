const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide all fields.');
  };

  const db = req.app.get('db');

  // check if user exists
  const sql = "SELECT * FROM Users WHERE email = ?";
  const queryResult = await new Promise((resolve, reject) => {
    db.query(sql, [email], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

  const userExists = queryResult.length > 0;
  if (userExists) {
    res.status(400);
    throw new Error('User already exists.');
  }
  
  // hash password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const encrypted = await bcrypt.hash(password, salt);

  // insert user into db
  const insertSql = "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)";
  const result = db.query(insertSql, [name, email, encrypted]);

  if (result) {
    // get user data after insertion
    const sql = "SELECT * FROM Users WHERE email = ?";
    db.query(sql, [email], (err, result) => {
      const user = result[0];
      res.status(200).json({
        name: user.name,
        email: user.email,
        token: generateToken(user.email),
      });
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials.');
  }
});

// @desc   Authenticate a user
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please fill in all fields.');
  }

  const db = req.app.get('db');

  // check if user exists
  const sql = "SELECT * FROM Users WHERE email = ?";
  const queryResult = await new Promise((resolve, reject) => {
    db.query(sql, [email], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

  const userExists = queryResult.length > 0;
  if (!userExists) {
    res.status(400);
    throw new Error('User does not exist.');
  }

  const user = queryResult[0];

  // match password - if here, user confirmed to exist
  if (await bcrypt.compare(password, user.password)) {
    res.json({
      name: user.name,
      email: user.email,
      token: generateToken(user.email),
    });
  } else {
    res.status(400);
    throw new Error('Invalid login credentials.');
  }
});

// @desc   Get user data
// @route  GET /api/users/me
// @access Private
const getUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// Generate JWT token, expires in 30 days
const generateToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
  });
}

module.exports = { registerUser, loginUser, getUser };
