const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const verifyToken = require("../middleware/authMiddleware");



/* ===========================
   🔥 ADD EVENT (Organiser Only)
=========================== */
router.post("/add", verifyToken, async (req, res) => {
  try {

    if (req.user.role !== "organiser") {
      return res.status(403).json({ message: "Only organisers can add events" });
    }

    const { title, college, description, date, participantLimit } = req.body;

    const newEvent = new Event({
      title,
      college,
      description,
      date,
      participantLimit,
      organiser: req.user.id
    });

    await newEvent.save();

    res.status(201).json({ message: "Event created successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



/* ===========================
   📥 GET ALL EVENTS
=========================== */
router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
      .populate("organiser", "name email")
      .populate("registrations.student", "name email");

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



/* ===========================
   📝 REGISTER (Student Only)
=========================== */
router.post("/register", verifyToken, async (req, res) => {
  try {

    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can register" });
    }

    const {
      eventId,
      teamName,
      teamMembers,
      collegeName,
      yearOfStudy
    } = req.body;

    const event = await Event.findById(eventId);

    if (!event)
      return res.status(404).json({ message: "Event not found" });

    const alreadyRegistered = event.registrations.find(
      (reg) => reg.student.toString() === req.user.id
    );

    if (alreadyRegistered)
      return res.status(400).json({ message: "Already registered" });

    event.registrations.push({
      student: req.user.id,
      teamName,
      teamMembers,
      collegeName,
      yearOfStudy,
      status: "pending"
    });

    await event.save();

    res.json({
      message: "Registration request sent (Pending approval)"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



/* ===========================
   ✅ APPROVE (Organiser Only)
=========================== */
router.put("/approve", verifyToken, async (req, res) => {
  try {

    if (req.user.role !== "organiser") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { eventId, studentId } = req.body;

    const event = await Event.findById(eventId);

    if (!event)
      return res.status(404).json({ message: "Event not found" });

    // Ensure organiser owns the event
    if (event.organiser.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const registration = event.registrations.find(
      (reg) => reg.student.toString() === studentId
    );

    if (!registration)
      return res.status(404).json({ message: "Registration not found" });

    const approvedCount = event.registrations.filter(
      (r) => r.status === "approved"
    ).length;

    if (approvedCount >= event.participantLimit) {
      return res.status(400).json({ message: "Participant limit reached" });
    }

    registration.status = "approved";

    await event.save();

    res.json({ message: "Registration approved" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



/* ===========================
   ❌ REJECT (Organiser Only)
=========================== */
router.put("/reject", verifyToken, async (req, res) => {
  try {

    if (req.user.role !== "organiser") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { eventId, studentId } = req.body;

    const event = await Event.findById(eventId);

    if (!event)
      return res.status(404).json({ message: "Event not found" });

    // Ensure organiser owns the event
    if (event.organiser.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const registration = event.registrations.find(
      (reg) => reg.student.toString() === studentId
    );

    if (!registration)
      return res.status(404).json({ message: "Registration not found" });

    registration.status = "rejected";

    await event.save();

    res.json({ message: "Registration rejected" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



/* ===========================
   🗑 DELETE EVENT (Organiser Only)
=========================== */
router.delete("/delete/:eventId", verifyToken, async (req, res) => {
  try {

    if (req.user.role !== "organiser") {
      return res.status(403).json({ message: "Only organisers can delete events" });
    }

    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event)
      return res.status(404).json({ message: "Event not found" });

    // Ensure organiser deletes only their event
    if (event.organiser.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this event" });
    }

    await Event.findByIdAndDelete(eventId);

    res.json({ message: "Event deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;