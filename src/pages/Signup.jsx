import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    const handleSignup = async()=>{
        try {
            await axios.post("http://localhost:8080/api/register/signup",{username,password});
            toast.success("signup successful");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 px-2 sm:px-4 py-6">
      <div className="bg-white p-4 sm:p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto transition-all duration-300">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-green-700 mb-6">Sign Up</h2>
        <input
          type="text"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-base sm:text-lg"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-base sm:text-lg"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignup}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg shadow hover:scale-105 hover:from-green-600 hover:to-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 font-semibold text-base sm:text-lg"
        >
          Sign Up
        </button>
        <p className="text-sm sm:text-base text-center mt-4">
          Already have an account? <span onClick={() => navigate('/login')} className="text-green-600 cursor-pointer hover:underline font-semibold">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
