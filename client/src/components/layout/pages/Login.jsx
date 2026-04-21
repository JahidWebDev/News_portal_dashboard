import React, { useState } from "react";
import { base_url } from "../../../config/config";  // Ensure this path is correct
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [loader, setLoader] = useState(false);

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    // Client-side validation (optional)
    if (!state.email || !state.password) {
      toast.error("Email and password are required");
      return;
    }

    setLoader(true);

    try {
      const { data } = await axios.post(`${base_url}/api/login`, state);

      // success message
      toast.success(data?.message || "Login Successful");

      // optional: token save
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      // Clear form fields after successful login
      setState({
        email: "",
        password: "",
      });

      console.log(data);  // Optionally, handle the user data for routing or state management

      // Optional: Redirect or take action on successful login
      // Example: Redirect to the dashboard or home page
      // history.push("/dashboard"); // If you're using React Router
    } catch (error) {
      // Catch network errors
      if (error.response) {
        // Backend returned a response (non-2xx status code)
        toast.error(error?.response?.data?.message || "Something went wrong");
      } else if (error.request) {
        // No response from server
        toast.error("Network error: No response from server");
      } else {
        // Other errors
        toast.error("An error occurred: " + error.message);
      }

      console.error(error);  // Log error details for debugging
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