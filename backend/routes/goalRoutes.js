const express = require('express');
const router = express.Router();
const { getGoals, setGoal, deleteGoal } = require('../controllers/goalController');
const { authenticate } = require('../middleware/authMiddleware');

// get goals + set goal
router.route('/').get(authenticate, getGoals).post(authenticate, setGoal);
// delete goal
router.route('/:id').delete(authenticate, deleteGoal);

module.exports = router;
