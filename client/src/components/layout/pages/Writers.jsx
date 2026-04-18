import React from 'react'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from "react-router-dom";

const Writers = () => {

  // ✅ temporary dummy data (error fix)
  const writers = [
    {
      _id: "1",
      name: "Jahid Hossen",
      category: "Tech",
      role: "Admin",
      email: "jahid@gmail.com"
    },
    {
      _id: "2",
      name: "Rahim Uddin",
      category: "News",
      role: "Editor",
      email: "rahim@gmail.com"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">

      {/* HEADER */}
      <div className="flex justify-between items-center p-5 border-gray-200 border-b">
        <h2 className="text-xl font-semibold text-slate-700">
          Writer
        </h2>

        <Link
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
          to="/dashboard/writers/add"
        >
          Add Writers
        </Link>
      </div>

      <div className='relative overflow-x-auto p-4'>
        <table className='w-full text-sm text-left text-slate-600'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th className='px-7 py-3'>No</th>
              <th className='px-7 py-3'>Name</th>
              <th className='px-7 py-3'>Category</th>
              <th className='px-7 py-3'>Role</th>
              <th className='px-7 py-3'>Image</th>
              <th className='px-7 py-3'>Email</th>
              <th className='px-7 py-3'>Active</th>
            </tr>
          </thead>

          <tbody>
            {
              writers.map((r, i) => (
                <tr key={i} className='bg-white border-b border-gray-200'>
                  <td className='px-6 py-4'>{i + 1}</td>
                  <td className='px-6 py-4'>{r.name}</td>
                  <td className='px-6 py-4'>{r.category}</td>
                  <td className='px-6 py-4'>{r.role}</td>

                  <td className='px-6 py-4'>
                    <img
                      className='w-[40px] h-[40px]'
                      src="https://res.cloudinary.com/dpj4vsqbo/image/upload/v1696952625/news/g7ihrhbxqdg5luzxtd9y.webp"
                      alt=""
                    />
                  </td>

                  <td className='px-6 py-4'>{r.email}</td>

                  <td className='px-6 py-4'>
                    <div className='flex justify-start items-center gap-x-4 text-white'>
                      <Link
                        to={`/dashboard/writer/${r._id}`}
                        className='p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition'
                      >
                        <FaEye />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Writers