import React from "react";
import { FaImage } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      
      {/* PROFILE CARD */}
      <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-6 hover:shadow-lg transition">
        
        {/* IMAGE UPLOAD */}
        <div>
          <label
            htmlFor="img"
            className="w-[140px] h-[140px] border-2 border-dashed border-gray-300 rounded-xl flex justify-center items-center cursor-pointer hover:border-purple-500 transition"
          >
            <div className="flex flex-col justify-center items-center text-gray-500">
              <FaImage className="text-2xl mb-2" />
              <span className="text-sm">Select Image</span>
            </div>
          </label>
          <input className="hidden" type="file" id="img" />
        </div>

        {/* USER INFO */}
        <div className="text-gray-700 flex flex-col gap-2">
          <span className="text-lg font-semibold">Jahid Sheikh</span>
          <span className="text-sm text-gray-500">jahid@gmail.com</span>
          <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full w-fit">
            Education
          </span>
        </div>
      </div>

      {/* PASSWORD CARD */}
      <div className="bg-white px-6 py-5 rounded-2xl shadow-md hover:shadow-lg transition">
        
        <h2 className="text-lg font-semibold text-center border-gray-200 text-gray-700 border-b pb-3">
          Change Password
        </h2>

        <form className="mt-5">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* OLD PASSWORD */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Old Password</label>
              <input
                type="password"
                name="old_password"
                placeholder="Enter old password"
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            {/* NEW PASSWORD */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">New Password</label>
              <input
                type="password"
                name="new_password"
                placeholder="Enter new password"
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

          </div>

          {/* BUTTON */}
          <div className="mt-6 text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:opacity-90 transition shadow-md"
            >
              Update Password
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default Profile;