# Student Record Management API

This is a simple backend API built using Node.js and Express.js to manage student records without using a database.

Student data is stored locally in a JSON file using the fs module.

---

## Features
- RESTful APIs
- CRUD operations
- No database (JSON file storage)
- Express.js backend

---

## Student Fields
- id
- name
- email
- course

---

## API Endpoints

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /students | Add student |
| GET | /students | Get all students |
| GET | /students/:id | Get student by ID |
| PUT | /students/:id | Update student |
| DELETE | /students/:id | Delete student |

---

## How to Run Project

```bash
npm install
node app.js
