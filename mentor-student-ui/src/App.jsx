import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

function App() {
  const [mentorName, setMentorName] = useState("");
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState("");

  const fetchMentors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/mentor");
      setMentors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/student");
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMentors();
    fetchStudents();
  }, []);

  const createMentor = async () => {
    const response = await axios.post("http://localhost:3000/api/mentor", {
      name: mentorName,
    });
    setMentorName("");
    fetchMentors();
  };

  const createStudent = async () => {
    const response = await axios.post("http://localhost:3000/api/student", {
      name: studentName,
    });
    setStudentName("");
    fetchStudents();
  };

  return (
    <Container>
      <h1>Mentor Management System</h1>
      <TextField
        label="Mentor Name"
        value={mentorName}
        onChange={(ele) => setMentorName(ele.target.value)}
      />
      <Button variant="contained" color="primary" onClick={createMentor}>
        Add Mentor
      </Button>
      <br></br>
      <TextField
        label="Student Name"
        value={studentName}
        onChange={(ele) => setStudentName(ele.target.value)}
      />
      <Button variant="contained" color="primary" onClick={createStudent}>
        Add Student
      </Button>
      <br></br>
      <h2>Mentors</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mentors.map((mentor) => (
              <TableRow key={mentor._id}>
                <TableCell>{mentor.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <h2>Students</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
