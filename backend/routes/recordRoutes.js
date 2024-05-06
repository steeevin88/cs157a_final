const express = require('express');
const router = express.Router();
const { getRecords, setRecord, deleteRecord } = require('../controllers/recordController');
const { authenticate } = require('../middleware/authMiddleware');

// get records + add record
router.route('/').get(authenticate, getRecords).post(authenticate, setRecord);
// delete record
router.route('/:id').delete(authenticate, deleteRecord);

module.exports = router;
