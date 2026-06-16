import { useContext } from "react";
import { studentManagementContext } from "../Store/Student-management-store";
import styles from "./Settings.module.css";

const Settings = () => {
  const { profileForm, changeProfileInfo, saveProfileInfo, exportStudents } =
    useContext(studentManagementContext);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Settings</h1>
      <section className={styles.card}>
        <h2>Profile settings</h2>
        <form onSubmit={saveProfileInfo}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              name="name"
              type="text"
              id="name"
              placeholder="Enter your name"
              value={profileForm.name || ""}
              onChange={changeProfileInfo}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={profileForm.email || ""}
              onChange={changeProfileInfo}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="role">Role</label>
            <input
              name="role"
              id="role"
              type="text"
              readOnly
              value={profileForm.role}
            />
          </div>
          <button type="submit" className={styles.primaryButton}>
            Save Changes
          </button>
        </form>
      </section>

      <section className={styles.card}>
        <h2>Preferences</h2>
        <div className={styles.preferenceGroup}>
          <p>Theme</p>
          <div className={styles.radioGroup}>
            <input
              name="theme"
              type="radio"
              value="Light"
              id="Light"
              checked={profileForm.theme === "Light"}
              onChange={changeProfileInfo}
            />
            <label htmlFor="Light">Light</label>
            <input
              name="theme"
              type="radio"
              value="Dark"
              id="Dark"
              checked={profileForm.theme === "Dark"}
              onChange={changeProfileInfo}
            />
            <label htmlFor="Dark">Dark</label>
          </div>
        </div>
        <div className={styles.formGroup}>
          <select
            name="language"
            value={profileForm.language}
            onChange={changeProfileInfo}
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
      </section>

      <section className={styles.card}>
        <h2>Data management</h2>
        <button className={styles.secondaryButton} onClick={exportStudents}>
          Export Student Data
        </button>
        <button className={styles.secondaryButton}>Reset Settings</button>
      </section>

      <section className={styles.card}>
        <h2>About application</h2>
        <div>
          <div className={styles.infoRow}>
            <span>Application Name</span>
            <span>Vidyarthi Student Management System</span>
          </div>

          <div className={styles.infoRow}>
            <span>Version</span>
            <span>1.0.0</span>
          </div>

          <div className={styles.infoRow}>
            <span>Frontend</span>
            <span>React</span>
          </div>

          <div className={styles.infoRow}>
            <span>Backend</span>
            <span>Node.js + Express</span>
          </div>

          <div className={styles.infoRow}>
            <span>Database</span>
            <span>PostgreSQL</span>
          </div>

          <div className={styles.infoRow}>
            <span>Developer</span>
            <span>Piyush Sharma</span>
          </div>

          <div className={styles.infoRow}>
            <span>Last updated</span>
            <span>June 2026</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
