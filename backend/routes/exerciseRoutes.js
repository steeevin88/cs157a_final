const express = require('express');
const router = express.Router();
const { getExercises, setExercise, updateExercise, deleteExercise } = require('../controllers/exerciseController');
const { authenticate } = require('../middleware/authMiddleware');

router.route('/').get(authenticate, getExercises).post(authenticate, setExercise); // get exercises + set exercise
router.route('/:id').put(authenticate, updateExercise).delete(authenticate, deleteExercise); // update + delete exercise

module.exports = router;
