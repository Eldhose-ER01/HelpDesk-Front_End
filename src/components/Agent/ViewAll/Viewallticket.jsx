import React, { useState, useEffect } from "react";
import Agentnav from "../AgentLogin/AgentNav";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { agentApi } from "../../Api/Api";

export default function ViewAllTickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(6); 

  const findTickets = async () => {
    try {
      const response = await axios.get(`${agentApi}/findticket`);
      if (response.data.success) {
        setTickets(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500 text-white";
      case "Pending":
        return "bg-red-500 text-white";
      case "Closed":
        return "bg-sky-500 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const addnotesdata = (id) => {
    const ticket = tickets.find(ticket => ticket._id === id);
    if (ticket) {
      navigate("/agent/addnotes", {
        state: { ticket } 
      });
    }
  };

  const statuschnage = async (id, newStatus) => {
    try {
      const response = await axios.put(`${agentApi}/statuschange`, {
        id,
        status: newStatus
      });
      if (response.data.success) {
        
        findTickets();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (index, newStatus) => {
    const updatedTickets = [...tickets];
    updatedTickets[index].status = newStatus;
    setTickets(updatedTickets);

   
    const ticketId = updatedTickets[index]._id;
    await statuschnage(ticketId, newStatus);
  };

  const formatIndianTime = (dateString) => {
    if (!dateString) {
      return 'N/A'; 
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date'; 
    }

    return date.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTickets = tickets.slice(indexOfFirstItem, indexOfLastItem); 

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    findTickets();
  }, []);

  useEffect(() => {
    console.log(tickets, "Tickets data"); // Log tickets data to debug
  }, [tickets]);

  return (
    <>
      <Agentnav />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">All Tickets</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left">Serial No</th>
                <th className="px-4 py-2 text-left">Ticket ID</th>
                <th className="px-4 py-2 text-left">Customer Name</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Last Update</th>
                <th className="px-4 py-2 text-left">Add Note</th>
              </tr>
            </thead>
            <tbody>
              {currentTickets.map((ticket, index) => (
                <tr key={ticket._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{indexOfFirstItem + index + 1}</td>
                  <td className="px-4 py-2">{ticket._id.slice(-4)}</td>
                  <td className="px-4 py-2">{ticket.user?.username || 'N/A'}</td>
                  <td className="px-4 py-2">{ticket.title}</td>
                  <td className="px-4 py-2">{ticket.description}</td>
                  <td className="px-4 py-2">
                    <select
                      className={`border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${getStatusClass(
                        ticket.status
                      )}`}
                      value={ticket.status}
                      onChange={(e) => handleStatusChange(indexOfFirstItem + index, e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    {ticket.lastUpdated ? formatIndianTime(ticket.lastUpdated) : 'N/A'}
                  </td>
                  <td className="px-4 py-2">
                    <button className="bg-black text-white px-3 py-1 rounded hover:bg-green-400 hover:text-black"  onClick={() => addnotesdata(ticket._id)}>
                      Add Note
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(tickets.length / itemsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 mx-1 ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
              } rounded hover:bg-gray-400`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(tickets.length / itemsPerPage)}
            className="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}