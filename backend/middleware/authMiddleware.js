const JWT = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get the bearer token from the header
      token = req.headers.authorization.split(' ')[1]; // Bearer token

      // Verify token + get user from token
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      console.log(decoded);

      const db = req.app.get('db');

      // Replace the following line with your MySQL query to fetch the user based on the email
      const sql = "SELECT * FROM Users WHERE email = ?";
      db.query(sql, [decoded.id], (err, result) => {
        if (err) {
          console.log(err);
          res.status(401);
          throw new Error('Not authorized. Here');
        }

        console.log(result);

        if (result.length === 0) {
          res.status(401);
          throw new Error('Not authorized. User does not exist.');
        }

        req.user = result[0];
        next();
      });
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Not authorized.');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized. Invalid token.');
  }
});

module.exports = { authenticate };