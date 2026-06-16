import { useState, useEffect, useContext } from "react";
import styles from "./StudentForm.module.css";
import { studentManagementContext } from "../Store/Student-management-store";

const StudentForm = () => {
  const {
    editingId,
    handleChange,
    handleSubmit,
    form,
    imagePreview,
    handleFileChange,
    showForm,
    setShowForm,
  } = useContext(studentManagementContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.formCard}>
        <div className={styles.modalHeader}>
          <h2>{editingId ? "Edit Student" : "Add Student"}</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setShowForm(false)}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formScrollArea}>
            <div className={styles.formGrid}>
              {/* Name */}
              <div className={styles.field}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name || ""}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  required
                />
              </div>

              {/* Course */}
              <div className={styles.field}>
                <label>Course</label>
                <select
                  name="course"
                  value={form.course || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Course</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="MBA">MBA</option>
                  <option value="BBA">BBA</option>
                  <option value="B.Arch">B.Arch</option>
                  <option value="B.Des">B.Des</option>
                  <option value="BCA">BCA</option>
                  <option value="B.SC">B.SC</option>
                </select>
              </div>

              {/* Year */}
              <div className={styles.field}>
                <label>Year</label>
                <input
                  type="number"
                  name="year"
                  value={form.year || ""}
                  onChange={handleChange}
                  placeholder="Enter year"
                  required
                />
              </div>

              {/* DOB */}
              <div className={styles.field}>
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className={`${styles.field} ${styles.fullWidth}`}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email || ""}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />
              </div>

              {/* Mobile */}
              <div className={styles.field}>
                <label>Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile || ""}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  required
                />
              </div>

              {/* Gender */}
              <div className={styles.field}>
                <label>Gender</label>
                <select
                  name="gender"
                  value={form.gender || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Address */}
              <div className={`${styles.field} ${styles.fullWidth}`}>
                <label>Address</label>
                <textarea
                  name="address"
                  value={form.address || ""}
                  onChange={handleChange}
                  placeholder="Enter complete residential address"
                  rows="2"
                  required
                />
              </div>

              {/* Photo Upload */}
              <div className={`${styles.field} ${styles.fullWidth}`}>
                <label>Student Profile Photo</label>
                <div className={styles.uploadZone}>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="photo-upload-input"
                    className={styles.fileInputHidden}
                  />
                  <label
                    htmlFor="photo-upload-input"
                    className={styles.uploadLabel}
                  >
                    {imagePreview ? (
                      <div className={styles.previewContainer}>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className={styles.previewImage}
                        />
                        <div className={styles.previewOverlay}>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>
                          <span>Change Photo</span>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.uploadPlaceholder}>
                        <div className={styles.uploadIconCircle}>
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                            <circle cx="12" cy="13" r="4"></circle>
                          </svg>
                        </div>
                        <div className={styles.uploadTextContainer}>
                          <span className={styles.uploadMainText}>
                            Click to upload profile picture
                          </span>
                          <span className={styles.uploadSubText}>
                            PNG, JPG or WEBP up to 25MB
                          </span>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              {editingId ? "Update Student" : "Save Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
