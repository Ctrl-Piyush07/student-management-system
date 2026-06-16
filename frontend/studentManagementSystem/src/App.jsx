import "./App.css";
import StudentTable from "./Components/StudentTable";
import StudentForm from "./Components/StudentForm";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { studentManagementContext } from "./Store/Student-management-store";
import Dashboard from "./Components/Dashboard";
import PageSkeleton from "./Components/Loader/PageSkeleton";
import Settings from "./Components/Settings";

const App = () => {
  const {
    filteredStudents,
    loading,
    showForm,
    handleAddStudent,
    handleSearch,
    searchTerm,
    setSearchTerm,
  } = useContext(studentManagementContext);

  const count = filteredStudents.length;

  if (loading) {
    return <PageSkeleton />;
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
          <Route path="/" element={<Navigate to="/Students" />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/students"
            element={
              <>
                <div className="actions">
                  <button
                    type="button"
                    className="addStudentBtn"
                    onClick={() => handleAddStudent()}
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
                  <input
                    className="searchInput"
                    type="text"
                    placeholder="Search by name, course, or year..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                  />
                </div>
                {showForm && <StudentForm />}
                {count === 0 ? (
                  <h3>No students found</h3>
                ) : count > 1 ? (
                  <h3>
                    {count} of {count} students
                  </h3>
                ) : (
                  <h3>
                    {count} of {count} student
                  </h3>
                )}
                <StudentTable />
              </>
            }
          />
          {/* <Route path="/courses" element={<h2>Courses Page</h2>} /> */}
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
