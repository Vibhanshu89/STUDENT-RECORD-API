const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;


app.use(express.json());


const filePath = path.join(__dirname, "data", "students.json");

function readStudents() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}


function writeStudents(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}


app.post("/students", (req, res) => {
  const students = readStudents();
  const newStudent = req.body;

  students.push(newStudent);
  writeStudents(students);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

app.get("/students", (req, res) => {
  const students = readStudents();
  res.json(students);
});


app.get("/students/:id", (req, res) => {
  const students = readStudents();
  const student = students.find(s => s.id == req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

app.put("/students/:id", (req, res) => {
  const students = readStudents();
  const index = students.findIndex(s => s.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students[index] = { ...students[index], ...req.body };
  writeStudents(students);

  res.json({
    message: "Student updated successfully",
    student: students[index]
  });
});


app.delete("/students/:id", (req, res) => {
  let students = readStudents();
  const newStudents = students.filter(s => s.id != req.params.id);

  if (students.length === newStudents.length) {
    return res.status(404).json({ message: "Student not found" });
  }

  writeStudents(newStudents);

  res.json({ message: "Student deleted successfully" });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
