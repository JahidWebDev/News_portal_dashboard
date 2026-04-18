import React from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const NewsContent = () => {
  return (
    <div className="p-4 bg-gray-50 ">

      {/* Filter Section */}
      <div className="flex border-amber-50 flex-col md:flex-row items-center gap-4 mb-5 bg-white p-4 rounded-xl shadow-sm border">

        <select className="px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-green-500 text-sm w-full md:w-auto">
          <option value="">---select type---</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="deactive">Deactive</option>
        </select>

        <input
          type="text"
          placeholder="Search news..."
          className="px-4 py-2 rounded-lg outline-none border border-gray-200 focus:border-green-500 text-sm w-full md:w-[250px]"
        />

      </div>

      {/* Table */}
      <div className="bg-white  shadow-sm  overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-sm text-left text-gray-600">

            <thead className="text-xs uppercase bg-gray-100 text-gray-500">
              <tr>
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b border-amber-50 hover:bg-gray-50 transition">

                <td className="px-6 py-4">1</td>

                <td className="px-6 py-4 font-medium text-gray-700">
                  India gets its longest glass bridge
                </td>

                <td className="px-6 py-4">
                  <img
                    className="w-10 h-10 rounded-lg object-cover"
                    src="https://res.cloudinary.com/dpj4vsgbo/image/upload/v1696952625/news/g7ihrhbxqdg5luzxtd9y.webp"
                    alt=""
                  />
                </td>

                <td className="px-6 py-4 text-gray-500">Travel</td>

                <td className="px-6 py-4 text-gray-400">
                  You all must have wa...
                </td>

                <td className="px-6 py-4 text-gray-400">
                  April 18, 2026
                </td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                    Active
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2 text-base">

                    <Link
                      to="/view/1"
                      className="p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition"
                    >
                      <FaEye />
                    </Link>

                    <Link
                      to="/edit/1"
                      className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition"
                    >
                      <FaEdit />
                    </Link>

                    <button className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition">
                      <FaTrash />
                    </button>

                  </div>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default NewsContent;