import { Outlet, Navigate } from "react-router-dom";

const ProtectRole = ({ role }) => {
  const user = {
    isAuth: true,
    role: "writer",
  };

  if (!user.isAuth) return <Navigate to="/login" />;

  if (user.role !== role) {
    return <Navigate to="/dashboard/unable-access" />;
  }

  return <Outlet />;
};

export default ProtectRole;