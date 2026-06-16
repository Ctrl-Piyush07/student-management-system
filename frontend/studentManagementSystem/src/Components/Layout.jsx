import { Outlet, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import styles from "./Layout.module.css";
import { studentManagementContext } from "../Store/Student-management-store";

const Layout = () => {
  const {
    showProfileMenu,
    setShowProfileMenu,
    hasNotifications,
    setHasNotifications,
    profileForm,
  } = useContext(studentManagementContext);

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div>
          <div className={styles.brandHeader}>
            <div className={styles.avatarLogo}>V</div>
            <div className={styles.brandText}>
              <h2 className={styles.logoTitle}>Vidyarthi</h2>
              <span className={styles.logoSubtitle}>Student Management</span>
            </div>
          </div>

          <ul className={styles.menu}>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <svg
                  className={styles.icon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="9"></rect>
                  <rect x="14" y="3" width="7" height="5"></rect>
                  <rect x="14" y="12" width="7" height="9"></rect>
                  <rect x="3" y="16" width="7" height="5"></rect>
                </svg>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/students"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <svg
                  className={styles.icon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                </svg>
                Students
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <svg
                  className={styles.icon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                Settings
              </NavLink>
            </li>
          </ul>
        </div>

        <div className={styles.sidebarFooter}>
          <p>© {new Date().getFullYear()} Vidyarthi Inc.</p>
          <small>All Rights Reserved</small>
        </div>
      </aside>

      <div className={styles.mainWrapper}>
        <nav className={styles.navbar}>
          <h3>विद्यार्थी</h3>

          <div className={styles.navActions}>
            {/* Notification Bell */}
            <button
              className={styles.notificationBtn}
              onClick={() => setHasNotifications(false)}
              title={
                hasNotifications ? "Clear Notifications" : "No Notifications"
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              {hasNotifications && <span className={styles.bellBadge} />}
            </button>

            <div className={styles.profileDropdownWrapper}>
              <button
                className={styles.profileBtn}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className={styles.avatarCircle}>AD</div>
                <span className={styles.adminText}>Admin</span>
                <svg
                  className={`${styles.chevron} ${showProfileMenu ? styles.chevronRotate : ""}`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {showProfileMenu && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownHeader}>
                    <strong>
                      {profileForm.name ? profileForm.name : "Admin"}
                    </strong>
                    <span>
                      {profileForm.email
                        ? profileForm.email
                        : "admin@vidyarthi.com"}
                    </span>
                  </div>
                  <hr className={styles.divider} />
                  <a href="#profile" className={styles.dropdownItem}>
                    My Profile
                  </a>
                  <a href="#settings" className={styles.dropdownItem}>
                    Account Settings
                  </a>
                  <hr className={styles.divider} />
                  <a
                    href="#logout"
                    className={`${styles.dropdownItem} styles.logoutItem`}
                  >
                    Log Out
                  </a>
                </div>
              )}
            </div>
          </div>
        </nav>

        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
