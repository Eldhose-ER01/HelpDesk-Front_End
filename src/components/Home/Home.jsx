import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function Home() {
    const navigate=useNavigate()
    const admin=()=>{
        navigate('/admin/login')
    }
    const agent=()=>{
        navigate('/agent/login')
    }
    const customer=()=>{
        navigate('/login')
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
        {/* Admin Box */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-center transform transition-transform duration-300 hover:scale-105" onClick={admin}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" // Replace with your Admin image URL
            alt="Admin"
            className="w-24 h-24 mx-auto mb-4 rounded-full"
          />
          <h2 className="text-xl font-semibold text-gray-800">Admin</h2>
        </div>

        {/* Agent Box */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-center transform transition-transform duration-300 hover:scale-105" onClick={agent}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" // Replace with your Agent image URL
            alt="Agent"
            className="w-24 h-24 mx-auto mb-4 rounded-full"
          />
          <h2 className="text-xl font-semibold text-gray-800">Coustomer Agent</h2>
        </div>

        {/* User Box */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-center transform transition-transform duration-300 hover:scale-105"onClick={customer}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" // Replace with your User image URL
            alt="User"
            className="w-24 h-24 mx-auto mb-4 rounded-full"
          />
          <h2 className="text-xl font-semibold text-gray-800">Coustomer</h2>
        </div>
      </div>
    </div>
  );
}