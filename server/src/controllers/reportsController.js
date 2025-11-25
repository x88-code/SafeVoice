const Report = require('../models/Report');

exports.createReport = async (req, res) => {
  try {
    const { title, description, location, contactMethod } = req.body;
    if (!description) return res.status(400).json({ message: 'Description is required' });

    const report = new Report({ title, description, location, contactMethod, anonymous: true });
    await report.save();
    return res.status(201).json({ message: 'Report submitted', reportId: report._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ date: -1 });
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};