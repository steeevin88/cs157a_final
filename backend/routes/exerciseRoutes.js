const express = require('express');
const router = express.Router();
const { getExercises, setExercise, updateExercise, deleteExercise } = require('../controllers/exerciseController');

router.route('/').get(getExercises).post(setExercise); // get exercises + set exercise
router.route('/:id').put(updateExercise).delete(deleteExercise); // update + delete exercise

module.exports = router;
