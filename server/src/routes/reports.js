const express = require('express');
const router = express.Router();
const { createReport, getReports, markReviewed } = require('../controllers/reportsController');
const auth = require('../middleware/auth');

// Public route to submit anonymous report
router.post('/', createReport);

// Admin: list reports (protected)
router.get('/', auth, getReports);

// Mark a report as reviewed (protected)
router.patch('/:id/reviewed', auth, markReviewed);

module.exports = router;