const Report = require('../models/Report');

exports.createReport = async (req, res) => {
  try {
    const { title, description, location, contactMethod, category } = req.body;
    if (!description) return res.status(400).json({ message: 'Description is required' });

    const report = new Report({ title, description, location, contactMethod, category, anonymous: true });
    await report.save();
    return res.status(201).json({ message: 'Report submitted', reportId: report._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getReports = async (req, res) => {
  try {
    // Support query params: category, startDate, endDate, reviewed
    const { category, startDate, endDate, reviewed, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (typeof reviewed !== 'undefined') filter.reviewed = reviewed === 'true';
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const reports = await Report.find(filter).sort({ date: -1 });
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.markReviewed = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    report.reviewed = true;
    await report.save();
    res.json({ message: 'Report marked as reviewed', id: report._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};