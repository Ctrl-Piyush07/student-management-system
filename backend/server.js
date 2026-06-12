import "dotenv/config";
import express from "express";
import cors from "cors";
import pool from "./db.js";
import multer from "multer";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
     credentials: true,
  }),
);

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 25 * 1024 * 1024 },
});

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("student management API running");
});

app.get("/students", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students ORDER BY id");
    res.json(result.rows);
    console.log("Database connection successful");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.post("/students", upload.single("photo"), async (req, res) => {
  try {
    const { name, course, year, dob, email, mobile, gender, address } =
      req.body;

    if (!dob || isNaN(Date.parse(dob))) {
      return res.status(400).json({
        message: "Invalid date format",
      });
    }

    let photoBase64 = null;
    if (req.file) {
      const base64String = req.file.buffer.toString("base64");
      photoBase64 = `data:${req.file.mimetype};base64,${base64String}`;
    }

    const lastStudent = await pool.query(
      "SELECT admission_number FROM students ORDER BY id DESC LIMIT 1",
    );

    let admission_number;

    if (lastStudent.rows.length === 0) {
      admission_number = "ADM001";
    } else {
      const lastAdmissionNumber = lastStudent.rows[0].admission_number;
      const numericPart = Number(lastAdmissionNumber.replace("ADM", ""));
      admission_number = `ADM${String(numericPart + 1).padStart(3, "0")}`;
    }

    const result = await pool.query(
      `INSERT INTO students
      (admission_number, name, course, year, dob, email, mobile, gender, address, photo_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        admission_number,
        name,
        course,
        year,
        dob,
        email,
        mobile,
        gender,
        address,
        photoBase64,
      ],
    );

    res.status(201).json({
      message: "Student added successfully",
      student: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const result = await pool.query("SELECT * FROM students WHERE id = $1", [
      studentId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const result = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [studentId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json({
      message: "Student deleted successfully",
      student: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.put("/students/:id", upload.single("photo"), async (req, res) => {
  try {
    const studentId = req.params.id;
    const { name, course, year, dob, email, mobile, gender, address } =
      req.body;

    const currentStudent = await pool.query(
      "SELECT * FROM students WHERE id = $1",
      [studentId],
    );
    if (currentStudent.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    let photoBase64 = null;
    if (req.file) {
      const base64String = req.file.buffer.toString("base64");
      photoBase64 = `data:${req.file.mimetype};base64,${base64String}`;
    } else {
      photoBase64 = currentStudent.rows[0].photo_url;
    }

    const result = await pool.query(
      `UPDATE students
       SET name=$1,
           course=$2,
           year=$3,
           dob=$4,
           email=$5,
           mobile=$6,
           gender=$7,
           address=$8,
           photo_url=$9
       WHERE id=$10
       RETURNING *`,
      [
        name,
        course,
        year,
        dob,
        email,
        mobile,
        gender,
        address,
        photoBase64,
        studentId,
      ],
    );

    res.json({
      message: "Student updated successfully",
      student: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.log("Database connection failed");
    console.log(err);
  } else {
    console.log("Database connection successful");
    console.log(result.rows[0]);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
