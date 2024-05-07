const express = require('express');
const router = express.Router();
const { getMotivationWalls, getMotivationWallById, createMotivationWall, deleteMotivationWall } = require('../controllers/motivationWallController');
const { authenticate } = require('../middleware/authMiddleware');

// get motivation walls, create motivation walls
router.route('/').get(getMotivationWalls).post(authenticate, createMotivationWall);
// get motivation wall by id, delete motivation wall
router.route('/:id').get(getMotivationWallById).delete(authenticate, deleteMotivationWall);

module.exports = router;
