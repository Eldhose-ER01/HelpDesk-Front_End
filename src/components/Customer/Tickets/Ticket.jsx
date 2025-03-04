import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from 'react-toastify';
import axios from "axios";
import Usernav from "../Userhome/Usernav";
import { userApi } from "../../Api/Api";
export default function Ticket() {
  const initialValue = {
    title: "",
    description: "",
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const token = localStorage.getItem('token');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${userApi}/tickets`, formValue, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.data.success) {
        toast.success("Ticket Added");
        setIsSubmitted(true);
        setFormValue(initialValue); 
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
      toast.error("Failed to submit ticket");
    }
  };
  

  return (
    <>
      <Usernav />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-24">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Submit New Support Ticket
        </h2>

        {isSubmitted && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center">
            <FaCheckCircle className="mr-2" />
            Your ticket has been submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title" // Fix: Corrected "tittle" to "title"
              value={formValue.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a title for your ticket"
              required
            />
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formValue.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              placeholder="Describe your issue in detail"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Ticket
          </button>
        </form>
      </div>
    </>
  );
}
