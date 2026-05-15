import React from "react";
import { FaPenNib, FaNewspaper, FaEye, FaClock } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";

const WriterIndex = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Back, Writer 
        </h1>
        <p className="text-gray-500">
          Manage your news articles, drafts and performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

        <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <FaNewspaper className="text-3xl text-red-600" />
            <div>
              <h2 className="text-2xl font-bold">24</h2>
              <p className="text-gray-500 text-sm">Total Articles</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <FaEye className="text-3xl text-black" />
            <div>
              <h2 className="text-2xl font-bold">1.2K</h2>
              <p className="text-gray-500 text-sm">Total Views</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <FaClock className="text-3xl text-gray-700" />
            <div>
              <h2 className="text-2xl font-bold">5</h2>
              <p className="text-gray-500 text-sm">Pending Review</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <FaPenNib className="text-3xl text-red-500" />
            <div>
              <h2 className="text-2xl font-bold">18</h2>
              <p className="text-gray-500 text-sm">Published</p>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Action */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Start Writing a New Article
          </h2>
          <p className="text-gray-500 text-sm">
            Publish news, stories or updates instantly
          </p>
        </div>

        <Link
          to="/dashboard/news/create"
          className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-black transition shadow-md"
        >
          <IoMdAddCircle className="text-xl" />
          Create News
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">

        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Recent Activity
        </h2>

        <div className="space-y-4 text-gray-600 text-sm">

          <div className="flex justify-between  pb-2">
            <span>✔ Published: New Tech Trends 2026</span>
            <span className="text-gray-400">2 min ago</span>
          </div>

          <div className="flex justify-between pb-2">
            <span>✏ Edited: Politics Update Today</span>
            <span className="text-gray-400">1 hour ago</span>
          </div>

          <div className="flex justify-between">
            <span>📝 Draft saved: Sports Highlights</span>
            <span className="text-gray-400">Yesterday</span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default WriterIndex;