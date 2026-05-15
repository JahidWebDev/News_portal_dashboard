import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdLogout } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import storeContext from "../../context/storeContext";
import logotwo from "../../assets/images/Sobdopoth.png";

const Sidebar = () => {
  const { store, dispatch } = useContext(storeContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="w-[250px] h-screen fixed left-0 top-0 bg-white/70  backdrop-blur-lg shadow-lg flex flex-col justify-between border-r border-white/10">

      {/* Top Section */}
      <div>

        {/* Logo */}
        <div className="h-[70px] pt-20 flex justify-center items-center">
          <Link to="/">
            <img
              src={logotwo}
              alt="logo"
              className="w-46 object-contain shadow-lg  rounded-lg border border-black/10"
            />
          </Link>
        </div>

        {/* Menu */}
        <ul className="px-3 pt-20 flex flex-col gap-y-2 font-medium mt-4">

  {store.user?.role === "admin" ? (
    <>
      <li>
        <Link
          to="/dashboard/admin"
          className={`${
            pathname === "/dashboard/admin"
              ? "bg-black text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-black hover:text-white hover:shadow-md"
          } px-3 py-2 w-full rounded-md flex gap-x-3 items-center transition-all duration-200`}
        >
          <AiFillDashboard className="text-xl" />
          <span>Dashboard</span>
        </Link>
      </li>

      <li>
        <Link
          to="/dashboard/writer/add"
          className={`${
            pathname === "/dashboard/writer/add"
              ? "bg-black text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-black hover:text-white hover:shadow-md"
          } px-3 py-2 w-full rounded-md flex gap-x-3 items-center transition-all duration-200`}
        >
          <IoPersonAdd className="text-xl" />
          <span>Add Writer</span>
        </Link>
      </li>

      <li>
        <Link
          to="/dashboard/writers"
          className={`${
            pathname === "/dashboard/writers"
              ? "bg-black text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-black hover:text-white hover:shadow-md"
          } px-3 py-2 w-full rounded-md flex gap-x-3 items-center transition-all duration-200`}
        >
          <FiUsers className="text-xl" />
          <span>Writers</span>
        </Link>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link
          to="/dashboard/writer"
          className={`${
            pathname === "/dashboard/writer"
              ? "bg-black text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-black hover:text-white hover:shadow-md"
          } px-3 py-2 w-full rounded-md flex gap-x-3 items-center transition-all duration-200`}
        >
          <AiFillDashboard className="text-xl" />
          <span>Dashboard</span>
        </Link>
      </li>

      <li>
        <Link
          to="/dashboard/news/create"
          className={`${
            pathname === "/dashboard/news/create"
              ? "bg-black text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-black hover:text-white hover:shadow-md"
          } px-3 py-2 w-full rounded-md flex gap-x-3 items-center transition-all duration-200`}
        >
          <FaPlus className="text-xl" />
          <span>Add News</span>
        </Link>
      </li>
    </>
  )}

  <li>
    <Link
      to="/dashboard/news"
      className={`${
        pathname === "/dashboard/news"
          ? "bg-black text-white shadow-md"
          : "bg-white text-gray-700 hover:bg-black hover:text-white hover:shadow-md"
      } px-3 py-2 w-full rounded-md flex gap-x-3 items-center transition-all duration-200`}
    >
      <FaRegNewspaper className="text-xl" />
      <span>News</span>
    </Link>
  </li>

  <li>
    <Link
      to="/dashboard/profile"
      className={`${
        pathname === "/dashboard/profile"
          ? "bg-black text-white shadow-md"
          : "bg-white text-gray-700 hover:bg-black hover:text-white hover:shadow-md"
      } px-3 py-2 w-full rounded-md flex gap-x-3 items-center transition-all duration-200`}
    >
      <ImProfile className="text-xl" />
      <span>Profile</span>
    </Link>
  </li>

</ul>
      </div>

      {/* Logout */}
      <div className="p-3">
        <div
          onClick={logout}
          className="px-3 py-2 w-full rounded-md flex gap-x-3 items-center cursor-pointer text-gray-700 transition-all duration-200 hover:bg-red-600 hover:text-white"
        >
          <MdLogout className="text-xl" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;