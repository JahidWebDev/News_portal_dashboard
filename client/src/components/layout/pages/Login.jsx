/* eslint-disable no-undef */
import React, { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import storeContext from "../../../context/storeContext";
import { base_url } from "../../../config/config";

const Login = () => {
  const [loader, setLoader] = useState(false);

  const { dispatch } = useContext(storeContext);
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!state.email || !state.password) {
      toast.error("Email and password are required");
      return;
    }

    setLoader(true);

    try {
      const { data } = await axios.post(`${base_url}/api/login`, state);

      toast.success(data?.message || "Login Successful", {
  duration: 1700,
});

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
      }

      setState({ email: "", password: "" });

      setTimeout(() => {
  navigate("/dashboard");
}, 2000);

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          jonospondon.com
        </h1>

        <form onSubmit={submit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              name="email"
              onChange={inputHandle}
              value={state.email}
              required
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              name="password"
              onChange={inputHandle}
              value={state.password}
              required
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-purple-500"
            />
          </div>

          {/* Button */}
          <button
            disabled={loader}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-lg hover:opacity-90 transition duration-200"
          >
            {loader ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;