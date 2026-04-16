import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import AdminIndex from "./components/layout/pages/AdminIndex";
import Login from "./components/layout/pages/Login";

import ProtectDashboard from "./middleware/ProtectDashboard";
import ProtectRole from "./middleware/ProtectRole";
import Unable from "./components/layout/pages/Unable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectDashboard />}>
          <Route path="/dashboard" element={<MainLayout />}>
            {/* default redirect */}
            <Route index element={<Navigate to="admin" replace />} />
            <Route path="unable-access" element={<Unable/>}/>

            {/* Admin role protected route */}
            <Route element={<ProtectRole role="admin" />}>
              <Route path="admin" element={<AdminIndex />} />
            </Route>
          </Route>
        </Route>

        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 fallback (optional but recommended) */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
