import React, { useContext, useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { base_url } from "../../../config/config";
import storeContext from "../../../context/storeContext";

const Writers = () => {
  const { store } = useContext(storeContext);

  const [writers, setWriters] = useState([]);
  const [loader, setLoader] = useState(false);

  // =========================
  // GET WRITERS API
  // =========================
  const get_writers = async () => {
    try {
      setLoader(true);

      const token = store?.token;

      if (!token) {
        toast.error("Unauthorized! Please login again.");
        setLoader(false);
        return;
      }
      console.log("TOKEN:", store?.token);
      const { data } = await axios.get(`${base_url}/api/writers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWriters(data.writers || []);
      toast.success(data.message || "Writers loaded");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  // =========================
  // LOAD ON TOKEN READY
  // =========================
  const hasFetched = useRef(false);

  useEffect(() => {
    if (store?.token && !hasFetched.current) {
      hasFetched.current = true;
      get_writers();
    }
  }, [store?.token]);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* HEADER */}
      <div className="flex justify-between items-center p-5 border-gray-200 border-b">
        <h2 className="text-xl font-semibold text-slate-700">Writers</h2>

        <Link
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
          to="/dashboard/writers/add"
        >
          Add Writers
        </Link>
      </div>

      {/* LOADER */}
      {loader && (
        <div className="p-4 text-center text-gray-500">Loading...</div>
      )}

      {/* TABLE */}
      <div className="relative overflow-x-auto p-4">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-7 py-3">No</th>
              <th className="px-7 py-3">Name</th>
              <th className="px-7 py-3">Category</th>
              <th className="px-7 py-3">Role</th>
              <th className="px-7 py-3">Email</th>
              <th className="px-7 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {writers.length > 0
              ? writers.map((r, i) => (
                  <tr key={r._id} className="bg-white border-b border-gray-200">
                    <td className="px-6 py-4">{i + 1}</td>
                    <td className="px-6 py-4">{r.name}</td>
                    <td className="px-6 py-4">{r.category}</td>
                    <td className="px-6 py-4">{r.role}</td>
                    <td className="px-6 py-4">{r.email}</td>

                    <td className="px-6 py-4">
                      <Link
                        to={`/dashboard/writer/${r._id}`}
                        className="p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition inline-block"
                      >
                        <FaEye />
                      </Link>
                    </td>
                  </tr>
                ))
              : !loader && (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No writers found
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Writers;
