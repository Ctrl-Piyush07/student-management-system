import { useReducer } from "react";
import { createContext } from "react";

export const studentContext = createContext({
  students: [],
  handleChange: () => {},
  handleEdit: () => {},
  handleSubmit: () => {},
  handleDelete: () => {},
});

const handleStudents = (currentStudents, action) => {
  if (action.type === "GET") {
  }
};

const studentContextProvider = ({ children }) => {
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
  });

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await api.get("/students");
        console.log(response.data);
        setStudents(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const response = await api.put(`/students/${editingId}`, form);
        setStudents(
          students.map((student) =>
            student.id === editingId ? response.data.student : student,
          ),
        );
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
        });
      } else {
        const response = await api.post("/students", form);
        console.log(response.data);

        setStudents([...students, response.data.student]);

        setForm({
          name: "",
          course: "",
          year: "",
          dob: "",
          email: "",
          mobile: "",
          gender: "",
          address: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/students/${id}`);

      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      course: student.course,
      year: student.year,
      // dob: student.dob,
      dob: student.dob ? student.dob.split("T")[0] : "",
      email: student.email,
      mobile: student.mobile,
      gender: student.gender,
      address: student.address,
    });
    setEditingId(student.id);
  };

  return (
    <studentContext.Provider
      value={{ students, handleChange, handleEdit, handleSubmit, handleDelete }}
    >
      {children}
    </studentContext.Provider>
  );
};

export default studentContextProvider;
