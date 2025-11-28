const mongoose = require('mongoose');

const CircleSchema = new mongoose.Schema({
  incidentType: { type: String, required: true },
  location: { type: String, required: true },
  language: { type: String, required: true },
  safetyLevel: { type: String, required: true },
  needsFacilitator: { type: Boolean, default: false },
  createdBy: { type: String, default: 'anonymous' },
  createdAt: { type: Date, default: Date.now },
  memberCount: { type: Number, default: 1 },
  maxMembers: { type: Number, default: 5 },
  members: [{
    joinedAt: Date,
    safetyLevel: String
  }],
  status: { type: String, enum: ['open', 'full', 'archived'], default: 'open' },
  chatRoomUrl: { type: String },
  facilitatorId: { type: String }
});

// Automatically update status based on member count
CircleSchema.pre('save', function(next) {
  if (this.memberCount >= this.maxMembers) {
    this.status = 'full';
  } else if (this.memberCount < this.maxMembers) {
    this.status = 'open';
  }
  next();
});

module.exports = mongoose.model('Circle', CircleSchema);
