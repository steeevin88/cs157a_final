const express = require('express');
const router = express.Router();
const { getMessages, createMessage } = require('../controllers/motivationWallMessageController');
const { authenticate } = require('../middleware/authMiddleware');

// add message to a wall
router.route('/').post(authenticate, createMessage);
// get a motivation wall's messages
router.route('/:id').get(authenticate, getMessages)

module.exports = router;
