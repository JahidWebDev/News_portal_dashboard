
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillDashboard, AiOutlinePlus } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { ImProfile } from "react-icons/im";
const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <div className="w-[250px] h-screen fixed left-0 top-0 bg-white shadow-md">
      {/* Logo */}
      <div className="h-[70px] flex justify-center items-center border-b">
        <Link to="/">
          <h1 className="w-[190px] h-[35px]  font-bold">Jonspondon News</h1>
        </Link>
      </div>

      {/* Menu */}
      <ul className="px-3 flex flex-col gap-y-2 font-medium mt-4">
        <li>
          <Link
            to="/dashboard/admin"
            className={`${pathname === "/dashboard/admin" ? " bg-indigo-500 text-white" : " bg-white text-[#4040f6]"} px-3 py-2 w-full rounded-sm flex gap-x-2 items-center 
                       hover:bg-indigo-500 hover:text-white 
                       hover:shadow-lg hover:shadow-indigo-500/20`}
          >
            <span className=" text-xl">
              {" "}
              <AiFillDashboard />{" "}
            </span>
            <span>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link
            to="/dashboard/news"
            className={`${pathname === "/dashboard/News" ? " bg-indigo-500 text-white" : " bg-white text-[#404040f6]"} px-3 py-2 w-full rounded-sm flex gap-x-2 items-center 
                       hover:bg-indigo-500 hover:text-white 
                       hover:shadow-lg hover:shadow-indigo-500/20`}
          >
            <span className=" text-xl">
              {" "}
              <AiFillDashboard />{" "}
            </span>
            <span>News</span>
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/Writer/add"
            className={`${pathname === "/dashboard/Writer/add" ? " bg-indigo-500 text-white" : " bg-white text-[#404040f6]"} px-3 py-2 w-full rounded-sm flex gap-x-2 items-center 
                       hover:bg-indigo-500 hover:text-white 
                       hover:shadow-lg hover:shadow-indigo-500/20`}
          >
            <span className=" text-xl">
              {" "}
              <AiOutlinePlus />{" "}
            </span>
            <span>Add Writer</span>
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/writers"
            className={`${pathname === "/dashboard/writers" ? " bg-indigo-500 text-white" : " bg-white text-[#404040f6]"} px-3 py-2 w-full rounded-sm flex gap-x-2 items-center 
                       hover:bg-indigo-500 hover:text-white 
                       hover:shadow-lg hover:shadow-indigo-500/20`}
          >
            <span className=" text-xl">
              {" "}
              <FiUsers />{" "}
            </span>
            <span>Writers</span>
          </Link>
        </li>

        <li>
          <Link
            to="/dashboard/profile"
            className={`${pathname === "/dashboard/profile" ? " bg-indigo-500 text-white" : " bg-white text-[#404040f6]"} px-3 py-2 w-full rounded-sm flex gap-x-2 items-center 
                       hover:bg-indigo-500 hover:text-white 
                       hover:shadow-lg hover:shadow-indigo-500/20`}
          >
            <span className=" text-xl">
              {" "}
              <ImProfile/>{" "}
            </span>
            <span>Profile</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
