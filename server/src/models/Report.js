const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  title: { type: String },
  category: { type: String },
  description: { type: String, required: true },
  location: { type: String },
  date: { type: Date, default: Date.now },
  contactMethod: { type: String },
  anonymous: { type: Boolean, default: true },
  reviewed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Report', ReportSchema);