import { createContext, useEffect, useReducer, useState } from "react";
import api from "../Services/api";
import toast from "react-hot-toast";

export const studentManagementContext = createContext({
  students: [],
  filteredStudents: [],
  courses: [],
  form: {},
  profileForm: {},
  editingId: null,
  loading: true,
  showForm: false,
  imagePreview: null,
  showProfileMenu: false,
  hasNotifications: true,
  searchTerm: "",

  handleChange: () => {},
  handleSubmit: () => {},
  handleEdit: () => {},
  handleDelete: () => {},
  handleFileChange: () => {},
  handleAddStudent: () => {},
  filterByCourse: () => {},
  changeProfileInfo: () => {},
  saveProfileInfo: () => {},
  exportStudents: () => {},
  setForm: () => {},
  setEditingId: () => {},
  setLoading: () => {},
  setShowForm: () => {},
  setImagePreview: () => {},
  setShowProfileMenu: () => {},
  setHasNotifications: () => {},
  setSearchTerm: () => {},
  setProfileForm: () => {},
});

const handleStudents = (currentStudents, action) => {
  let newStudents = currentStudents;
  if (action.type === "FETCH") {
    newStudents = [...action.payload.current_Students];
  } else if (action.type === "ADD") {
    newStudents = [...currentStudents, action.payload.student];
  } else if (action.type === "EDIT") {
    newStudents = currentStudents.map((student) =>
      student.id === action.payload.editingId
        ? action.payload.student
        : student,
    );
  } else if (action.type === "DELETE") {
    newStudents = currentStudents.filter(
      (student) => student.id !== action.payload.id,
    );
  }
  return newStudents;
};

const StudentManagementContextProvider = ({ children }) => {
  const [students, dispatchActions] = useReducer(handleStudents, []);

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
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const courses = ["B.Tech", "MBA", "BBA", "B.Arch", "B.Des", "BCA", "B.SC"];

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    role: "Administrator",
    theme: "Light",
    language: "English",
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await api.get("/students");
        dispatchActions({
          type: "FETCH",
          payload: {
            current_Students: response.data,
          },
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to load students");
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
          toast.error("File size should not be exceed 25MB", {
            duration: 5000,
            icon: "⚠️",
          });
          return;
        }
        setForm({ ...form, photo: fileObject });
      }
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
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      if (editingId) {
        const response = await api.put(
          `/students/${editingId}`,
          formData,
          config,
        );
        dispatchActions({
          type: "EDIT",
          payload: { student: response.data.student, editingId },
        });
        setEditingId(null);
        setShowForm(false);
        toast.success(`${form.name}'s profile updated successfully!`);
      } else {
        const response = await api.post("/students", formData, config);
        dispatchActions({
          type: "ADD",
          payload: {
            student: response.data.student,
          },
        });
        setShowForm(false);
        toast.success(`Student ${form.name} registered successfully`);
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
        error.response?.data?.message ||
          "An error occured.Pls try again later!",
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/students/${id}`);
      const student = response.data.student;
      toast.success(`${student.name} has been removed`);
      dispatchActions({
        type: "DELETE",
        payload: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Could not delete Student!");
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

  useEffect(() => {
    if (editingId && form.photoUrl) {
      setImagePreview(form.photoUrl);
    } else {
      setImagePreview(null);
    }
  }, [editingId, form.photoUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      if (handleChange) {
        handleChange({
          target: {
            name: "photo",
            value: file,
            files: e.target.files,
          },
        });
      }
    }
  };

  const handleAddStudent = () => {
    setEditingId(null);
    setShowForm(true);
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
  };

  const search = searchTerm.toLowerCase();
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search) ||
      student.course.toLowerCase().includes(search) ||
      student.year.toString().includes(search),
  );

  const filterByCourse = (courseName) => {
    const studentsByCourse = students.filter(
      (student) => student.course === courseName,
    );
    return studentsByCourse;
  };

  const changeProfileInfo = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const saveProfileInfo = (e) => {
    e.preventDefault();
  };

  const exportStudents = () => {
    const headers = Object.keys(students[0]).filter(
      (header) => header !== "photo_url",
    );

    const rows = students.map((student) =>
      headers.map((header) => student[header]),
    );
    // console.log(rows);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");
    // console.log(csvContent);

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "students.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <studentManagementContext.Provider
      value={{
        students,
        handleChange,
        handleSubmit,
        handleEdit,
        handleDelete,
        handleFileChange,
        handleAddStudent,
        form,
        setForm,
        editingId,
        setEditingId,
        loading,
        setLoading,
        showForm,
        setShowForm,
        imagePreview,
        setImagePreview,
        showProfileMenu,
        setShowProfileMenu,
        hasNotifications,
        setHasNotifications,
        searchTerm,
        setSearchTerm,
        filteredStudents,
        filterByCourse,
        courses,
        profileForm,
        setProfileForm,
        changeProfileInfo,
        saveProfileInfo,
        exportStudents,
      }}
    >
      {children}
    </studentManagementContext.Provider>
  );
};

export default StudentManagementContextProvider;
