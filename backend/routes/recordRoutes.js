const express = require('express');
const router = express.Router();
const { getRecords, createRecord, deleteRecord } = require('../controllers/recordController');
const { authenticate } = require('../middleware/authMiddleware');

// add record
router.route('/').post(authenticate, createRecord);
// get an exercise's records + delete record
router.route('/:id').get(authenticate, getRecords).delete(authenticate, deleteRecord);

module.exports = router;
