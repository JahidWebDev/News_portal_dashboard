import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import storeContext from "../context/storeContext"; // path ঠিক করো

const ProtectRole = ({ role }) => {
  const { store } = useContext(storeContext);

  // 1. auth check
  if (!store?.token) {
    return <Navigate to="/login" replace />;
  }

if (!store?.token) {
  return <Navigate to="/login" replace />;
}

if (store?.user?.role !== role) {
  return <Navigate to="/dashboard/unable-access" replace />;
}
  return <Outlet />;
};

export default ProtectRole;