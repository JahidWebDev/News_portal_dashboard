import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";

import { base_url } from "../../config/config";
import storeContext from "../../context/storeContext";
import { convert } from "html-to-text";

const NewsContent = () => {
  const { store } = useContext(storeContext);

  const [news, setNews] = useState([]);
  const [all_news, set_all_news] = useState([]);

  const [page, setPage] = useState(1);
  const [parpage, setParPage] = useState(5);
  const [pages, setPages] = useState(0);

  const [search, setSearch] = useState("");

  // ======================
  // DELETE NEWS (FIXED)
  // ======================
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${base_url}/api/news/${id}`, {
        headers: {
          Authorization: `Bearer ${store?.token}`,
        },
      });

      toast.success("News deleted");

      get_news();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  // ======================
  // STATUS CHANGE
  // ======================
  const changeStatus = async (id, currentStatus) => {
    let newStatus = "";

    if ((currentStatus || "").toLowerCase() === "active") {
      newStatus = "pending";
    } else if ((currentStatus || "").toLowerCase() === "pending") {
      newStatus = "deactive";
    } else {
      newStatus = "active";
    }

    try {
      const { data } = await axios.put(
        `${base_url}/api/news/status-update/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${store?.token}`,
          },
        },
      );

      toast.success(data?.message || "Status updated");

      // update news instantly
      setNews((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item,
        ),
      );

      // update all news instantly
      set_all_news((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item,
        ),
      );
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Status update failed");
    }
  };

  // ======================
  // GET NEWS
  // ======================
  const get_news = async () => {
    try {
      if (!store?.token) return;

      const { data } = await axios.get(`${base_url}/api/news/dashboard/news`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });

      const newsData = data?.news || [];

      setNews(newsData);
      set_all_news(newsData);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (store?.token) {
      get_news();
    }
  }, [store?.token]);

  // ======================
  // SEARCH FILTER
  // ======================
  useEffect(() => {
    let filtered = [...all_news];

    if (search) {
      filtered = filtered.filter((item) =>
        item.title?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setNews(filtered);
    setPage(1);
  }, [search, all_news]);

  // ======================
  // PAGE COUNT
  // ======================
  useEffect(() => {
    setPages(Math.ceil(news.length / parpage));
  }, [news, parpage]);

  // ======================
  // PAGE SAFETY
  // ======================
  useEffect(() => {
    if (page > pages) {
      setPage(1);
    }
  }, [pages, page]);

  // ======================
  // PAGINATION
  // ======================
  const indexOfLastNews = page * parpage;
  const indexOfFirstNews = indexOfLastNews - parpage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  // ======================
  // STATUS FILTER
  // ======================
  const type_filter = (e) => {
    const value = e.target.value.toLowerCase();

    if (value === "all") {
      setNews(all_news);
    } else {
      const filtered = all_news.filter(
        (n) => (n.status || "").toLowerCase() === value,
      );

      setNews(filtered);
    }

    setPage(1);
  };

  return (
    <div className="p-5 bg-gray-50 rounded-xl">
      {/* FILTER */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-5 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <select
          onChange={type_filter}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm w-full md:w-auto"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="deactive">Deactive</option>
        </select>

        <input
          type="text"
          placeholder="Search news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm w-full md:w-[250px]"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
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

            <tbody className="divide-y divide-gray-100">
              {currentNews?.length > 0 ? (
                currentNews.map((item, index) => (
                  <tr key={item._id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-600">
                      {indexOfFirstNews + index + 1}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.title}
                    </td>

                    <td className="px-6 py-4">
                      <img
                        className="w-11 h-11 rounded-lg object-cover"
                        src={item.image || "/placeholder.png"}
                        alt=""
                      />
                    </td>

                    <td className="px-6 py-4 text-gray-500">{item.category}</td>

                    <td className="px-6 py-4 text-gray-400">
                      {convert(item.description || "", {
                        wordwrap: false,
                      }).slice(0, 25)}
                      ...
                    </td>

                    <td className="px-6 py-4 text-gray-400">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "No date"}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => changeStatus(item._id, item.status)}
                        className={`px-3 py-1 text-xs rounded-full font-medium capitalize transition-all duration-200 ${
                          (item.status || "").toLowerCase() === "active"
                            ? "bg-green-100 text-green-600 hover:bg-green-200"
                            : (item.status || "").toLowerCase() === "pending"
                              ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                              : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                      >
                        {item.status}
                      </button>
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/view/${item._id}`}
                          className="p-2 bg-blue-50 text-blue-500 rounded-md"
                        >
                          <FaEye />
                        </Link>

                        {store?.user?.role === "writer" && (
                          <>
                            <Link
                              to={`/dashboard/news/edit/${item._id}`}
                              className="p-2 bg-green-50 text-green-600 rounded-md"
                            >
                              <FaEdit />
                            </Link>

                            <button
                              onClick={() => handleDelete(item._id)}
                              className="p-2 bg-red-50 text-red-500 rounded-md"
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-400">
                    No News Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-5 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Per Page</span>

          <select
            value={parpage}
            onChange={(e) => {
              setParPage(Number(e.target.value));
              setPage(1);
            }}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>

        <p className="text-sm text-gray-500">
          Page {page} of {pages || 1}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            className="p-2 bg-gray-100 rounded-md"
          >
            <IoIosArrowBack />
          </button>

          <button
            onClick={() => setPage(page < pages ? page + 1 : pages)}
            className="p-2 bg-gray-100 rounded-md"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsContent;
