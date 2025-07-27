//import axios from '..//utils/axiosIns';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import instance from '..//utils/axiosIns';

const Welcome = () => {
  
  const [users, setUsers] = useState([]);
  const nav = useNavigate();

  useEffect(()=>{
    instance.get('/api/welcome')
    .then(res => setUsers(res.data))
    .catch(() => nav("/login"));

  },[nav]);

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    nav("/login");
  }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 px-2 sm:px-4 py-6">
        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-2xl w-full max-w-3xl mx-auto transition-all duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 text-center sm:text-left">Welcome</h2>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg shadow hover:scale-105 hover:from-red-600 hover:to-red-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Logout
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-left rounded-lg overflow-hidden">
              <thead className="bg-blue-100 text-blue-700">
                <tr>
                  <th className="py-2 px-2 sm:px-4 border-b text-xs sm:text-base">ID</th>
                  <th className="py-2 px-2 sm:px-4 border-b text-xs sm:text-base">Username</th>
                  <th className="py-2 px-2 sm:px-4 border-b text-xs sm:text-base">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-4 px-4 text-center text-gray-500">No users found.</td>
                  </tr>
                ) : (
                  users.map((user, idx) => (
                    <tr key={idx} className="hover:bg-gray-100 transition-colors">
                      <td className="py-2 px-2 sm:px-4 border-b text-xs sm:text-base">{user.id}</td>
                      <td className="py-2 px-2 sm:px-4 border-b text-xs sm:text-base">{user.username}</td>
                      <td className="py-2 px-2 sm:px-4 border-b text-xs sm:text-base">{user.role}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
}

export default Welcome

