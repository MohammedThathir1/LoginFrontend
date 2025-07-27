import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async(e) =>{
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8080/api/register/login', {username,password});
        localStorage.setItem("token", response.data.token);
        toast.success('Login successful')
        navigate('/welcome');
    
    } catch (error) {
        console.log(error);
       toast.error('Login failed, Invalid credentials!');
    }
  }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-2 sm:px-4 py-6">
        <div className="bg-white p-4 sm:p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto transition-all duration-300">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-indigo-700 mb-6">Login</h2>
          <input
            type="text"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base sm:text-lg"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base sm:text-lg"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg shadow hover:scale-105 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-semibold text-base sm:text-lg"
          >
            Login
          </button>
          <p className="text-sm sm:text-base text-center mt-4">
            Dont have an account? <span onClick={() => navigate('/signup')} className="text-indigo-600 cursor-pointer hover:underline font-semibold">Sign Up</span>
          </p>
        </div>
      </div>
    )
}

export default Login

