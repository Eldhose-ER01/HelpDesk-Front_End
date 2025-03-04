import axios from 'axios';
import Usernav from './Usernav';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userApi} from '../../Api/Api';
export default function Userhome() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  const Newticket = () => {
    navigate('/tickets');
  };

 
  const Getticket = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${userApi}/findticket`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setTickets(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  useEffect(() => {
    Getticket();
  }, []);

 
  const formatIndianTime = (dateString) => {
    const date = new Date(dateString);
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
  const indexOfLastTicket = currentPage * itemsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const DeleteTicket = async (id) => {
    try {
      const token = localStorage.getItem('token');

        const response = await axios.put(`${userApi}/deleteticket/?id=${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
          
        );
      if (response.data.success) {
        setTickets(response.data.data);
        window.location.reload()
        toast.success("User Deleted")
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Usernav />
      <div className="max-w-8xl mx-auto mt-8 p-4">
        <div className="flex justify-end mb-6">
          <button
            className="h-12 bg-black text-green-400 font-bold hover:bg-green-400 hover:text-white px-6 rounded-sm transition-all duration-300"
            onClick={Newticket}
          >
            ADD New Tickets
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Support Tickets</h2>

        {/* Table for Ticket List */}
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700 uppercase">S.No</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700 uppercase">Title</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700 uppercase">Description</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700 uppercase">Status</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700 uppercase">Last Updated</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentTickets.map((ticket, index) => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition-all duration-200">
                  <td className="py-4 px-6 text-sm text-gray-700">{indexOfFirstTicket + index + 1}</td>
                  <td className="py-4 px-6 text-sm text-gray-700 font-medium">{ticket.title}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{ticket.description}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        ticket.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {ticket.lastUpdated ? formatIndianTime(ticket.lastUpdated) : 'N/A'}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-3">
                      <button
                        className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition-all duration-200"
                        onClick={() => {
                          DeleteTicket(ticket._id)
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-200 transition-all duration-200"
                        onClick={() => {
                          navigate('/updateticket', { state: { ticket } });
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-sm hover:bg-green-200 transition-all duration-200"
                        onClick={() => {
                          navigate("/addnote", {
                            state: {state: ticket },
                          });
                        }} 
                      >
                        Add Note
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-l hover:bg-gray-200 transition-all duration-200 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(tickets.length / itemsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 ${
                currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              } hover:bg-gray-200 transition-all duration-200`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(tickets.length / itemsPerPage)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-r hover:bg-gray-200 transition-all duration-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}