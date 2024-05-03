const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const db = req.app.get('db');
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) return res.json({ error: err });
    return res.json(result);
  });
});

module.exports = router;
