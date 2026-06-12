import { useContext } from "react";
import styles from "./StudentTable.module.css";
import { studentManagementContext } from "../Store/Student-management-store";

const StudentTable = () => {
  const { filteredStudents, handleEdit, handleDelete } = useContext(
    studentManagementContext,
  );
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={`${styles.th} ${styles.alignLeft}`}>Name</th>
            <th className={styles.th}>Course</th>
            <th className={styles.th}>Year</th>
            <th className={`${styles.th} ${styles.alignLeft}`}>Email</th>
            <th className={styles.th}>Mobile</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id} className={styles.row}>
              <td
                className={`${styles.td} ${styles.alignLeft} ${styles.primaryText}`}
              >
                {student.name}
              </td>
              <td className={styles.td}>
                <span className={styles.badge}>{student.course}</span>
              </td>
              <td className={styles.td}>{student.year}</td>
              <td
                className={`${styles.td} ${styles.alignLeft} ${styles.secondaryText}`}
              >
                {student.email}
              </td>
              <td className={`${styles.td} ${styles.secondaryText}`}>
                {student.mobile}
              </td>

              <td className={styles.td}>
                <div className={styles.actionGroup}>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(student)}
                    title="Edit Student"
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
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>

                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(student.id)}
                    title="Delete Student"
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
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
