import React, { useContext } from "react";
import { Link, useLocation, useNavigate  } from "react-router-dom";
import { AiFillDashboard} from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdLogout } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import storeContext from "../../context/storeContext";

const Sidebar = () => {
const { store, dispatch } = useContext(storeContext);
const navigate = useNavigate();
 const { pathname } = useLocation();
const logout = () => {
  localStorage.removeItem("token");     // correct key
  dispatch({ type: "LOGOUT" });         // correct type
  navigate("/login");                   // redirect
};
  return (
    <div className="w-[250px] h-screen fixed left-0 top-0 bg-[#F3F4F6] shadow-lg flex flex-col justify-between">

      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="h-[70px] flex justify-center items-center">
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
      ? "bg-indigo-500/90 text-white shadow-md" 
      : "bg-white/10 text-gray-700 hover:bg-indigo-600 hover:text-white hover:shadow-md" 
    } px-3 py-2 w-full rounded-md flex gap-x-3 items-center transition-all duration-200`} 
  > 
    <AiFillDashboard className="text-xl" /> 
    <span>Dashboard</span> 
  </Link> 
</li>

              <li>
                <Link
                  to="/dashboard/writer/add"
                  className={`${pathname === "/dashboard/writer/add"
                    ? "bg-indigo-500/90 text-white shadow-md"
                    : "bg-white text-gray-700"
                  } px-3 py-2 w-full rounded-md flex gap-x-3 items-center transition-all duration-200 hover:bg-indigo-600 hover:text-white hover:shadow-md`}
                >
                  <IoPersonAdd className="text-xl" />
                  <span>Add Writer</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/writers"
                  className={`${pathname === "/dashboard/writers"
                    ? "bg-indigo-500/90 text-white shadow-md"
                    : "bg-white text-gray-700"
                  } px-3 py-2 w-full rounded-md flex gap-x-3 items-center transition-all duration-200 hover:bg-indigo-600 hover:text-white hover:shadow-md`}
                >
                  <FiUsers className="text-xl" />
                  <span>Writers</span>
                </Link>
              </li>
            </> : <>
              <li>
                <Link
                  to="/dashboard/writer"
                  className={`${pathname === "/dashboard/writer"
                    ? "bg-indigo-500/90 text-white shadow-md"
                    : "bg-white text-gray-700"
                  } px-3 py-2 w-full rounded-md flex gap-x-3 items-center transition-all duration-200 hover:bg-indigo-600 hover:text-white hover:shadow-md`}
                >
                  <AiFillDashboard className="text-xl" />
                  <span>Dashboard</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/news/create"
                  className={`${pathname === "/dashboard/news/create"
                    ? "bg-indigo-500/90 text-white shadow-md"
                    : "bg-white text-gray-700"
                  } px-3 py-2 w-full rounded-md flex gap-x-3 items-center transition-all duration-200 hover:bg-indigo-600 hover:text-white hover:shadow-md`}
                >
                  <FaPlus className="text-xl" />
                  <span>Add News</span>
                </Link>
              </li>
            </>
          }

          <li>
            <Link
              to="/dashboard/news"
              className={`${pathname === "/dashboard/news"
                ? "bg-indigo-500/90 text-white shadow-md"
                : "bg-white text-gray-700"
              } px-3 py-2 w-full rounded-md flex gap-x-3 items-center transition-all duration-200 hover:bg-indigo-600 hover:text-white hover:shadow-md`}
            >
              <FaRegNewspaper className="text-xl" />
              <span>News</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/profile"
              className={`${pathname === "/dashboard/profile"
                ? "bg-indigo-500/90 text-white shadow-md"
                : "bg-white text-gray-700"
              } px-3 py-2 w-full rounded-md flex gap-x-3 items-center transition-all duration-200 hover:bg-indigo-600 hover:text-white hover:shadow-md`}
            >
              <ImProfile className="text-xl" />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout (BOTTOM ALIGNED) */}
      <div className="p-3">
    <div
  onClick={logout}
  className="px-3 py-2 w-full rounded-md flex gap-x-3 items-center justify-start
  text-gray-600/90 cursor-pointer
  transition-all duration-200
  hover:bg-black hover:text-white"
>
  <MdLogout className="text-xl" />
  <span>Logout</span>
</div>
      </div>

    </div>
  );
};

export default Sidebar;