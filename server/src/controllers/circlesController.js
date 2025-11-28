const Circle = require('../models/Circle');

// Match and find existing circles or return no match
const matchCircle = async (req, res) => {
  try {
    const { incidentType, location, language, safetyLevel, wantsFacilitator } = req.body;

    if (!incidentType || !location || !language || !safetyLevel) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Search for matching open circles
    const matchedCircle = await Circle.findOne({
      incidentType,
      location,
      language,
      status: 'open',
      $expr: { $lt: ['$memberCount', '$maxMembers'] }
    });

    if (matchedCircle) {
      return res.status(200).json({
        circleFound: true,
        circle: matchedCircle
      });
    }

    // No match found
    return res.status(200).json({
      circleFound: false,
      circle: null,
      message: 'No existing circle found. You can create a new one.'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error searching for circles', error: err.message });
  }
};

// Create a new circle
const createCircle = async (req, res) => {
  try {
    const {
      incidentType,
      location,
      language,
      safetyLevel,
      needsFacilitator,
      createdBy,
      memberCount,
      maxMembers,
      members
    } = req.body;

    if (!incidentType || !location || !language || !safetyLevel) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newCircle = new Circle({
      incidentType,
      location,
      language,
      safetyLevel,
      needsFacilitator: needsFacilitator || false,
      createdBy: createdBy || 'anonymous',
      memberCount: memberCount || 1,
      maxMembers: maxMembers || 5,
      members: members || [{
        joinedAt: new Date(),
        safetyLevel
      }],
      status: 'open'
    });

    await newCircle.save();

    res.status(201).json({
      success: true,
      message: 'Circle created successfully',
      circle: newCircle
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating circle', error: err.message });
  }
};

// Join an existing circle
const joinCircle = async (req, res) => {
  try {
    const { id } = req.params;
    const { memberData } = req.body;

    const circle = await Circle.findById(id);

    if (!circle) {
      return res.status(404).json({ message: 'Circle not found' });
    }

    if (circle.memberCount >= circle.maxMembers) {
      return res.status(400).json({ message: 'Circle is full' });
    }

    // Add member
    circle.members.push({
      joinedAt: memberData.joinedAt || new Date(),
      safetyLevel: memberData.safetyLevel
    });
    circle.memberCount += 1;

    // Update status
    if (circle.memberCount >= circle.maxMembers) {
      circle.status = 'full';
    }

    await circle.save();

    res.status(200).json({
      success: true,
      message: 'Joined circle successfully',
      circle
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error joining circle', error: err.message });
  }
};

// Get circle details
const getCircle = async (req, res) => {
  try {
    const { id } = req.params;

    const circle = await Circle.findById(id);

    if (!circle) {
      return res.status(404).json({ message: 'Circle not found' });
    }

    res.status(200).json(circle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching circle', error: err.message });
  }
};

// List all open circles (for discovery)
const listOpenCircles = async (req, res) => {
  try {
    const { location, language, incidentType } = req.query;

    let filter = { status: 'open' };

    if (location) filter.location = location;
    if (language) filter.language = language;
    if (incidentType) filter.incidentType = incidentType;

    const circles = await Circle.find(filter).sort({ createdAt: -1 });

    res.status(200).json(circles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching circles', error: err.message });
  }
};

module.exports = {
  matchCircle,
  createCircle,
  joinCircle,
  getCircle,
  listOpenCircles
};
