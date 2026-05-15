/* eslint-disable no-undef */
import React, { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import storeContext from "../../../context/storeContext";
import { base_url } from "../../../config/config";
import logo from "../../../assets/images/Sobdopoth.png";

const Login = () => {
  const [loader, setLoader] = useState(false);

  const { dispatch } = useContext(storeContext);
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const inputHandle = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!state.email || !state.password) {
      toast.error("Email and password are required");
      return;
    }

    setLoader(true);

    try {
      const { data } = await axios.post(
        `${base_url}/api/login`,
        state
      );

      toast.success(data?.message || "Login Successful");

      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            token: data.token,
            user: data.user
          }
        });

        const role = data?.user?.role?.toLowerCase();

        setTimeout(() => {
          if (role === "admin") navigate("/dashboard/admin");
          else if (role === "writer") navigate("/dashboard/writer");
          else navigate("/dashboard/unable-access");
        }, 800);
      }

      setState({ email: "", password: "" });

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center px-4">

      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-10 border-t-4 border-red-600">

        {/* Logo */}
        <div className="flex justify-center mb-10 px-5">
          <img
            src={logo}
            alt="logo"
            className="w-64 object-contain shadow-lg rounded-lg border border-black/10"
          />
        </div>

        <form onSubmit={submit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-[18px] font-semibold text-gray-700 mb-2">
              Email
            </label>

            <input
              name="email"
              onChange={inputHandle}
              value={state.email}
              required
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-3 text-lg text-gray-800 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[18px] font-semibold text-gray-700 mb-2">
              Password
            </label>

            <input
              name="password"
              onChange={inputHandle}
              value={state.password}
              required
              type="password"
              placeholder="Enter your password"
              className="w-full px-5 py-3 text-lg text-gray-800 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
            />
          </div>

          {/* Button */}
          <button
            disabled={loader}
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-black text-white py-4 text-xl font-semibold rounded-xl hover:scale-[1.02] active:scale-95 transition duration-200 shadow-lg"
          >
            {loader ? "Loading..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;