const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String, required: true },
  location: { type: String },
  date: { type: Date, default: Date.now },
  contactMethod: { type: String },
  anonymous: { type: Boolean, default: true }
});

module.exports = mongoose.model('Report', ReportSchema);