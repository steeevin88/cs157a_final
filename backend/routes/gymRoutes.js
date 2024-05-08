const express = require('express');
const router = express.Router();
const { getGyms, createGym, deleteGym } = require('../controllers/gymController');
const { authenticate } = require('../middleware/authMiddleware');

// get goals, create gym
router.route('/').get(authenticate, getGyms).post(authenticate, createGym);
// delete gym
router.route('/:id').delete(authenticate, deleteGym);

module.exports = router;
