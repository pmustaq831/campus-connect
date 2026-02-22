const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  teamName: {
    type: String,
    required: true
  },
  teamMembers: {
    type: String,
    required: true
  },
  collegeName: {
    type: String,
    required: true
  },
  yearOfStudy: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
});

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    college: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    participantLimit: {
      type: Number,
      required: true
    },
    organiser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    registrations: [registrationSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);