import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import AdminIndex from "./components/layout/pages/AdminIndex";
import Login from "./components/layout/pages/Login";

import ProtectDashboard from "./middleware/ProtectDashboard";
import ProtectRole from "./middleware/ProtectRole";
import Unable from "./components/layout/pages/Unable";
import AddWriter from "./components/layout/pages/AddWriter";
import Writers from "./components/layout/pages/Writers";
import News from "./components/layout/pages/News";
import Profile from "./components/layout/pages/Profile";
import CreateNews from "./components/layout/pages/CreateNews";
import { WriterIndex } from "./components/layout/pages/WriterIndex";

function App() {
  const user = {
    role: "writer"
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectDashboard />}>
          <Route path="/dashboard" element={<MainLayout />}>

            {/* ✅ Role based redirect */}
            <Route
              index
              element={
                user.role === "admin" ? (
                  <Navigate to="admin" replace />
                ) : (
                  <Navigate to="writer" replace />
                )
              }
            />

            <Route path="unable-access" element={<Unable />} />
            <Route path="news" element={<News />} />
            <Route path="profile" element={<Profile />} />

            {/* Admin Routes */}
            <Route element={<ProtectRole role="admin" />}>
              <Route path="admin" element={<AdminIndex />} />
              <Route path="writer/add" element={<AddWriter />} />
              <Route path="writers" element={<Writers />} />
            </Route>

            {/* Writer Routes */}
            <Route element={<ProtectRole role="writer" />}>
              <Route path="writer" element={<WriterIndex />} />
              <Route path="news/create" element={<CreateNews />} />
            </Route>

          </Route>
        </Route>

        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
