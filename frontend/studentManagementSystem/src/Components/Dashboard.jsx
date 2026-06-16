import { useContext } from "react";
import { studentManagementContext } from "../Store/Student-management-store";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { students, filterByCourse, courses } = useContext(
    studentManagementContext,
  );

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <h1>Dashboard Overview</h1>
        <p>Monitor students and course statistics</p>
      </div>
      <div className={styles.dashboard}>
        <div
          className={`${styles.card} ${styles.heroCard} ${styles.totalStudents}`}
        >
          <h2>Total Students</h2>
          <h3>{students.length}</h3>
        </div>
        <div
          className={`${styles.card} ${styles.heroCard} ${styles.totalCourses}`}
        >
          <h2>Total Courses</h2>
          <h3>{courses.length}</h3>
        </div>
        {courses.map((course) => (
          <div key={course} className={`${styles.card} ${styles.courseInfo}`}>
            <h2>{course}</h2>
            <h3>{filterByCourse(course).length}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
