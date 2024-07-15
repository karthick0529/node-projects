const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    mentor:{
        type: String,
        required: false,
    },
    previous_mentor:{
        type: Array,
        required: false,
    }
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;