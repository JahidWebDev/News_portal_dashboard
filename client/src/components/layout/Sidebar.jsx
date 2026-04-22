import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillDashboard, AiOutlinePlus } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { ImProfile } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import storeContext from "../../context/storeContext";
const Sidebar = () => {
 const { store  } = useContext(storeContext)


  const { pathname } = useLocation();
  //   const userInfo = {
  //   role: "writer"
  // };
  return (
    <div className="w-[250px] h-screen fixed left-0 top-0 bg-white shadow-lg  flex flex-col">

      {/* Logo */}
      <div className="h-[70px] flex justify-center items-center ">
        <Link to="/">
          <h1 className="text-lg font-bold tracking-wide text-indigo-600">
            Jonspondon News
          </h1>
        </Link>
      </div>

      {/* Menu */}
      <ul className="px-3 flex flex-col gap-y-2 font-medium mt-4">
           {
            store.user?.role === 'admin' ? <> 
            <li>
          <Link
            to="/dashboard/admin"
            className={`${pathname === "/dashboard/admin"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-gray-700"
            } px-3 py-2 w-full rounded-md flex gap-x-3 items-center
            transition-all duration-200
            hover:bg-indigo-600 hover:text-white hover:shadow-md`}
          >
            <span className="text-xl">
              <AiFillDashboard />
            </span>
            <span>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link
            to="/dashboard/writer/add"
            className={`${pathname === "/dashboard/writer/add"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-gray-700"
            } px-3 py-2 w-full rounded-md flex gap-x-3 items-center
            transition-all duration-200
            hover:bg-indigo-600 hover:text-white hover:shadow-md`}
          >
            <span className="text-xl">
              <AiOutlinePlus />
            </span>
            <span>Add Writer</span>
          </Link>
        </li>

        <li>
          <Link
            to="/dashboard/writers"
            className={`${pathname === "/dashboard/writers"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-gray-700"
            } px-3 py-2 w-full rounded-md flex gap-x-3 items-center
            transition-all duration-200
            hover:bg-indigo-600 hover:text-white hover:shadow-md`}
          >
            <span className="text-xl">
              <FiUsers />
            </span>
            <span>Writers</span>
          </Link>
        </li>
            </>:<>
                  <li>
          <Link
            to="/dashboard/writer"
            className={`${pathname === "/dashboard/writer"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-gray-700"
            } px-3 py-2 w-full rounded-md flex gap-x-3 items-center
            transition-all duration-200
            hover:bg-indigo-600 hover:text-white hover:shadow-md`}
          >
            <span className="text-xl">
              <AiFillDashboard />
            </span>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/news/create"
            className={`${pathname === "/dashboard/news/create"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-gray-700"
            } px-3 py-2 w-full rounded-md flex gap-x-3 items-center
            transition-all duration-200
            hover:bg-indigo-600 hover:text-white hover:shadow-md`}
          >
            <span className="text-xl">
              <FaPlus />
            </span>
            <span>Add News</span>
          </Link>
        </li>
            </> 
           }
        

        <li>
          <Link
            to="/dashboard/news"
            className={`${pathname === "/dashboard/news"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-gray-700"
            } px-3 py-2 w-full rounded-md flex gap-x-3 items-center
            transition-all duration-200
            hover:bg-indigo-600 hover:text-white hover:shadow-md`}
          >
            <span className="text-xl">
              <AiFillDashboard />
            </span>
            <span>News</span>
          </Link>
        </li>


        <li>
          <Link
            to="/dashboard/profile"
            className={`${pathname === "/dashboard/profile"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-gray-700"
            } px-3 py-2 w-full rounded-md flex gap-x-3 items-center
            transition-all duration-200
            hover:bg-indigo-600 hover:text-white hover:shadow-md`}
          >
            <span className="text-xl">
              <ImProfile />
            </span>
            <span>Profile</span>
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;