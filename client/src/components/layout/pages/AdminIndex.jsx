import React from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminIndex = () => {
  return (
    <div className="mt-6 space-y-6">

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {[
          { title: "Total News", count: 50 },
          { title: "Pending News", count: 50 },
          { title: "Active News", count: 50 },
          { title: "Deactive News", count: 50 },
          { title: "Writers", count: 50 },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col items-center justify-center"
          >
            <span className="text-2xl font-bold text-slate-800">
              {item.count}
            </span>
            <span className="text-sm text-slate-500 mt-1">
              {item.title}
            </span>
          </div>
        ))}
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-xl shadow-sm p-5">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-700">
            Recent News
          </h2>

          <Link className="text-sm text-blue-500 hover:underline">
            View all
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-600">

            <thead className="text-xs uppercase bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4, 5, 6, 7].map((n, i) => (
                <tr
                  key={i}
                  className="border-b border-amber-50 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">{i + 1}</td>

                  <td className="px-6 py-4">
                    India gets its longest glass b...
                  </td>

                  <td className="px-6 py-4">
                    <img
                      className="w-10 h-10 rounded object-cover"
                      src="https://res.cloudinary.com/dpj4vsqbo/image/upload/v1696952625/news/g7ihrhbxqdg5luzxtd9y.webp"
                      alt=""
                    />
                  </td>

                  <td className="px-6 py-4">Travel</td>

                  <td className="px-6 py-4">
                    You all must have wa...
                  </td>

                  <td className="px-6 py-4">Oct 10, 2023</td>

                       <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                    Active
                  </span>
                </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">

                               <Link
                      to="/view/1"
                      className="p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition"
                    >
                      <FaEye />
                    </Link>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminIndex;