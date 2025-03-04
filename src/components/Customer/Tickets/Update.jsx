import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from 'react-toastify';
import axios from "axios";
import { useLocation } from "react-router-dom";
import Usernav from "../Userhome/Usernav";
import { userApi } from "../../Api/Api";

export default function Update() {
  const initialValue = {
    ticket: {
      title: "",
      description: "",
    },
  };

  const location = useLocation();
  const initalvalue = location.state || initialValue;

  const [formValue, setFormValue] = useState(initalvalue);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      ticket: {
        ...formValue.ticket,
        [name]: value, 
      },
    });
  };

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${userApi}/updateticket`, formValue, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success("Ticket Updated");
      
       
        setFormValue(initialValue); 

      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      toast.error("Failed to update ticket");
    }
  };

  return (
    <>
      <Usernav />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-24">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Update Support Ticket
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formValue.ticket.title}
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
              value={formValue.ticket.description}
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
            Update Ticket
          </button>
        </form>
      </div>
    </>
  );
}