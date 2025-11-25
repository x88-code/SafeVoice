const express = require('express');
const router = express.Router();
const { createReport, getReports } = require('../controllers/reportsController');

// Public route to submit anonymous report
router.post('/', createReport);

// Admin: list reports (will protect with JWT later)
router.get('/', getReports);

module.exports = router;