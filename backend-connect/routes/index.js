const express = require("express");
const Mentor = require("../models/mentor");
const Student = require("../models/student");
// const Person = require("../models/person")

const router = express.Router();

// API to create Mentor
router.post("/mentor",async(req,res) => {
    try{
        const mentor = new Mentor(req.body);
        await mentor.save();
        res.status(201).send(mentor);
    }
    catch(error){
        res.status(400).send(error); 
    }
})

router.post("/student",async(req,res) => {
    try{
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    }
    catch(error){
        res.status(400).send(error); 
    }
})

router.get("/mentor", async (req,res) => {
    try{
        const mentors = await Mentor.find()
        res.send(mentors);
    }
    catch(error){
        res.status(400).send(error); 
    }
})

router.get("/student", async (req,res) => {
    try{
        const students = await Student.find()
        .populate("mentor")
        .populate("previousMentor");
        res.send(students);
    }
    catch(error){
        res.status(400).send(error); 
    }
})

// router.post("/person",async(req,res) => {
//     try{
//         const person = new Person(req.body);
//         await person.save();
//         res.status(201).send(person);
//     }
//     catch(error){
//         res.status(400).send(error); 
//     }
// })

// router.get("/person", async (req,res) => {
//     try{
//         const persons = await Person.find()
//         res.send(persons);
//     }
//     catch(error){
//         res.status(400).send(error); 
//     }
// })


module.exports = router;