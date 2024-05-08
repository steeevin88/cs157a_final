const asyncHandler = require('express-async-handler')

// @desc      Get all messages based on motivation wall id
// @route     GET /api/messages
// @access    Private
const getMessages = asyncHandler(async (req, res) => {
  const db = req.app.get('db');
  const motivation_wall_id = req.params.id;
  const email = req.user.email;

  const sql = `
    SELECT MM.*
    FROM MotivationalMessages MM
    INNER JOIN MotivationWallMessages MWM ON MM.MMID = MWM.MMID
    INNER JOIN MotivationWall MW ON MWM.MWID = MW.MWID
    WHERE MW.MWID = ?
  `;
  const values = [motivation_wall_id];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500);
      throw new Error('Failed to retrieve messages.');
    }

    return res.json(result);
  });
});

// @desc      Create message
// @route     POST /api/messages
// @access    Private
const createMessage = asyncHandler(async (req, res) => {
  const { wall_id, content } = req.body;
  const motivation_wall_id = wall_id;
  const email = req.user.email;

  if (!content) {
    res.status(400);
    throw new Error('Please provide content fields.');
  }

  const db = req.app.get('db');

  // Insert into MotivationalMessages table
  const insertMessageSql = 'INSERT INTO MotivationalMessages (email, content, date) VALUES (?, ?, NOW())';
  const insertMessageValues = [email, content];

  db.query(insertMessageSql, insertMessageValues, (err, messageResult) => {
    if (err) {
      res.status(500);
      console.log(err);
      throw new Error('Failed to create message.');
    }

    const messageId = messageResult.insertId;

    // Insert into MotivationWallMessages table
    const insertWallMessageSql = 'INSERT INTO MotivationWallMessages (MWID, MMID) VALUES (?, ?)';
    const insertWallMessageValues = [motivation_wall_id, messageId];

    db.query(insertWallMessageSql, insertWallMessageValues, (err, wallMessageResult) => {
      if (err) {
        res.status(500);
        console.log(err);
        throw new Error('Failed to create wall message.');
      }

      return res.status(200).json({ message: 'Message created successfully.' });
    });
  });
});

module.exports = {
  getMessages,
  createMessage
};
