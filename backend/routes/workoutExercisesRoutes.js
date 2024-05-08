const express = require('express');
const router = express.Router();
const { getWorkoutExercises, addWorkoutExercise, deleteWorkoutExercise } = require('../controllers/workoutExercisesController');
const { authenticate } = require('../middleware/authMiddleware');

router.route('/:id').get(authenticate, getWorkoutExercises).post(addWorkoutExercise).delete(deleteWorkoutExercise);

module.exports = router;
