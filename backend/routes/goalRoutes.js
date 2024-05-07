const express = require('express');
const router = express.Router();
const { getGoals, createGoal, deleteGoal } = require('../controllers/goalController');
const { authenticate } = require('../middleware/authMiddleware');

// get goals, create goal
router.route('/').get(authenticate, getGoals).post(authenticate, createGoal);
// delete goal
router.route('/:id').delete(authenticate, deleteGoal);

module.exports = router;
