import { Outlet, Navigate } from "react-router-dom";

const ProtectDashboard = () => {
  const user = { isAuth: true };

  if (!user.isAuth) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectDashboard;