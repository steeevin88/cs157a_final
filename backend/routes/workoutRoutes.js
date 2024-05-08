const express = require('express');
const router = express.Router();
const { getWorkouts, getWorkoutById, createWorkout, deleteWorkout } = require('../controllers/workoutController');
const { authenticate } = require('../middleware/authMiddleware');

// get workouts, create workout
router.route('/').get(authenticate, getWorkouts).post(authenticate, createWorkout);
// get workout by id, delete workout
router.route('/:id').get(authenticate, getWorkoutById).delete(authenticate, deleteWorkout);

module.exports = router;
