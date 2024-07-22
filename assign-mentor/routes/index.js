const express = require("express");
const Mentor = require("../models/mentor");
const Student = require("../models/student");

const router = express.Router();

// API to create Mentor

router.post("/mentor", async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).send(mentor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// API to create Student

router.post("/student", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// API to get Mentor

router.get("/mentor", async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.send(mentors);
  } catch (error) {
    res.status(400).send(error);
  }
});

// API to get Student

router.get("/student", async (req, res) => {
  try {
    const students = await Student.find()
      .populate("mentor")
      .populate("previousMentor");
    res.send(students);
  } catch (error) {
    res.status(400).send(error);
  }
});

// API to assign a student to a mentor

router.post("/assign-student", async (req, res) => {
  try {
    const { mentorId, studentIds } = req.body;
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).send("Mentor not found");
    }

    const updatedStudents = await Student.updateMany(
      { _id: { $in: studentIds }, mentor: null },
      { mentor: mentorId }
    );

    res.send(updatedStudents);
  } catch (error) {
    res.status(400).send(error);
  }
});

// API to change mentor for a particular student

router.put("/change-mentor/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const { mentorId } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send("Student not found");
    }

    student.previousMentor = student.mentor;
    student.mentor = mentorId;
    await student.save();

    res.send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// API to show all students for a particular mentor

router.get("/students-by-mentor/:mentorId", async (req, res) => {
  try {
    const { mentorId } = req.params;
    const students = await Student.find({ mentor: mentorId });
    res.send(students);
  } catch (error) {
    res.status(400).send(error);
  }
});

// API to show the previously assigned mentor for a particular student

router.get("/previous-mentor/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate(
      "previousMentor"
    );
    if (!student) {
      return res.status(404).send("Student not found");
    }

    res.send(student.previousMentor);
  } catch (error) {
    res.status(400).send(error);
  }
});


module.exports = router;
