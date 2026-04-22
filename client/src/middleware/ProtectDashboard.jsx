import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import storeContext from "../context/storeContext"; // path ঠিক করো

const ProtectDashboard = () => {
  const { store } = useContext(storeContext);
console.log(store);

  // check token বা user
  if (!store.token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectDashboard;