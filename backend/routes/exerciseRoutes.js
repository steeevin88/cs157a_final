const express = require('express');
const router = express.Router();
const { getExercises, getExerciseById, createExercise, updateExercise, deleteExercise } = require('../controllers/exerciseController');
const { authenticate } = require('../middleware/authMiddleware');

// get exercises + set exercise
router.route('/').get(authenticate, getExercises).post(authenticate, createExercise);
// get exercise by id, update exercise, delete exercise
router.route('/:id').get(authenticate, getExerciseById).put(authenticate, updateExercise).delete(authenticate, deleteExercise);

module.exports = router;
