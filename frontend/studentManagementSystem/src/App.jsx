import "./App.css";
import { useState, useEffect } from "react";
import api from "./Services/api";
import StudentTable from "./Components/StudentTable";
import StudentForm from "./Components/StudentForm";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    course: "",
    year: "",
    dob: "",
    email: "",
    mobile: "",
    gender: "",
    address: "",
    photo: null,
    photoUrl: null,
  });

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // FETCH ALL STUDENTS FROM DATABASE
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await api.get("/students");
        setStudents(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load students directory.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      const fileObject = files ? files[0] : value;

      if (fileObject) {
        const MAX_SIZE = 25 * 1024 * 1024;
        if (fileObject.size > MAX_SIZE) {
          toast.error("File size exceeds the 25MB maximum limit!", {
            duration: 5000,
            icon: "⚠️",
          });
          return;
        }
      }

      setForm({ ...form, photo: fileObject });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("course", form.course);
    formData.append("year", form.year);
    formData.append("dob", form.dob);
    formData.append("email", form.email);
    formData.append("mobile", form.mobile);
    formData.append("gender", form.gender);
    formData.append("address", form.address);

    if (form.photo) {
      formData.append("photo", form.photo);
    }

    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      if (editingId) {
        const response = await api.put(
          `/students/${editingId}`,
          formData,
          config,
        );
        setStudents(
          students.map((s) => (s.id === editingId ? response.data.student : s)),
        );
        setEditingId(null);
        setShowForm(false);
        toast.success(`${form.name}'s profile updated successfully!`);
      } else {
        const response = await api.post("/students", formData, config);
        setStudents([...students, response.data.student]);
        setShowForm(false);
        toast.success(`Student ${form.name} registered successfully!`);
      }

      setForm({
        name: "",
        course: "",
        year: "",
        dob: "",
        email: "",
        mobile: "",
        gender: "",
        address: "",
        photo: null,
        photoUrl: null,
      });
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again.",
      );
    }
  };

  const handleDelete = async (id) => {
    const studentToDelete = students.find((s) => s.id === id);
    const studentName = studentToDelete ? studentToDelete.name : "Student";

    try {
      await api.delete(`/students/${id}`);
      setStudents(students.filter((s) => s.id !== id));
      toast.success(`${studentName} has been removed.`);
    } catch (error) {
      console.log(error);
      toast.error(`Could not remove ${studentName}.`);
    }
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      course: student.course,
      year: student.year,
      dob: student.dob ? student.dob.split("T")[0] : "",
      email: student.email,
      mobile: student.mobile,
      gender: student.gender,
      address: student.address,
      photoUrl: student.photo_url,
      photo: null,
    });

    setEditingId(student.id);
    setShowForm(true);
  };

  if (loading) {
    return <h2 className="loading-text">Loading student database...</h2>;
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#0f172a",
            color: "#fff",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "14px",
            borderRadius: "10px",
            padding: "12px 18px",
          },
          success: {
            iconTheme: {
              primary: "#2563eb",
              secondary: "#fff",
            },
          },
        }}
      />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<h2>Dashboard Page</h2>} />

          <Route
            path="/students"
            element={
              <>
                <button
                  type="button"
                  className="addStudentBtn"
                  onClick={() => {
                    setShowForm(true);
                    setEditingId(null);
                    setForm({
                      name: "",
                      course: "",
                      year: "",
                      dob: "",
                      email: "",
                      mobile: "",
                      gender: "",
                      address: "",
                      photo: null,
                      photoUrl: null,
                    });
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: "8px" }}
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add Student
                </button>

                {showForm && (
                  <StudentForm
                    editingId={editingId}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    form={form}
                    onClose={() => setShowForm(false)}
                  />
                )}

                {students.length === 0 ? (
                  <h3>No students found</h3>
                ) : (
                  <StudentTable
                    students={students}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                )}
              </>
            }
          />
          <Route path="/courses" element={<h2>Courses Page</h2>} />
          <Route path="/settings" element={<h2>Settings Page</h2>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
