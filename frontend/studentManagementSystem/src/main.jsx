import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import StudentManagementContextProvider from "./Components/Store/Student-management-store.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <StudentManagementContextProvider>
        <App />
      </StudentManagementContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
