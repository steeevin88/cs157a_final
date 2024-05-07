const express = require('express');
const router = express.Router();
const { getExercises, getExerciseById, createExercise, deleteExercise } = require('../controllers/exerciseController');
const { authenticate } = require('../middleware/authMiddleware');

// get exercises, create exercise
router.route('/').get(authenticate, getExercises).post(authenticate, createExercise);
// get exercise by id, delete exercise
router.route('/:id').get(authenticate, getExerciseById).delete(authenticate, deleteExercise);

module.exports = router;
