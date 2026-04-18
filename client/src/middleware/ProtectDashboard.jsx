import { Outlet, Navigate } from "react-router-dom";

const ProtectDashboard = () => {
  const user = { 
    isAuth: true,
    name: "jahid",
    role: "admin",
  };

  if (!user.isAuth) {
    return <Navigate to="/login" />;
  }

  return <Outlet />; 
};

export default ProtectDashboard;