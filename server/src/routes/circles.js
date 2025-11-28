const express = require('express');
const router = express.Router();
const {
  matchCircle,
  createCircle,
  joinCircle,
  getCircle,
  listOpenCircles
} = require('../controllers/circlesController');

// Public routes
// Match or search for circles
router.post('/match', matchCircle);

// Get list of open circles
router.get('/', listOpenCircles);

// Get specific circle details
router.get('/:id', getCircle);

// Create a new circle
router.post('/', createCircle);

// Join an existing circle
router.post('/:id/join', joinCircle);

module.exports = router;
