import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaUser, FaStickyNote, FaPlus, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { agentApi,userApi } from "../../Api/Api";

export default function Agentnote() {
    const location = useLocation();
    const initialValue = location?.state?.ticket || {}; 
    const [refresh, setRefresh] = useState(true);
    const [ticket, setTicket] = useState({
        title: "",
        description: "",
        notes: [],
        ...initialValue, 
    });
    const [newNote, setNewNote] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const notesPerPage = 3;

    console.log("Location State:", location.state); 
    console.log("Ticket Data:", ticket); 

    const handleAddNote = async () => {
        const token = localStorage.getItem("agenttoken");

        if (newNote.trim()) {
            try {
                const response = await axios.post(
                    `${agentApi}/addnotes`,
                    {
                        ticketId: ticket._id,
                        note: newNote,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.data.success) {
                    setRefresh((prev) => !prev); 
                    setNewNote("");
                }
            } catch (error) {
                console.error("Error adding note:", error);
            }
        }
    };

    const getNote = async () => {
        try {
            const token = localStorage.getItem("agenttoken");
            const ticketId = ticket._id;

            if (!ticketId) {
                console.error("Ticket ID is missing");
                return;
            }

            const response = await axios.get(`${userApi}/getnote?ticketId=${ticketId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            
            if (response.data.success) {
                const updatedNotes = response.data.data.map((note, index) => ({
                    id: index + 1,
                    addedBy: note.addedBy?.username || note.addedByagent?.agentname || note.addedByadmin?.adminname ||"Unknown",
                    note: note.text,
                    timestamp: new Date(note.createdAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    }),
                }));

                setTicket((prevTicket) => ({
                    ...prevTicket,
                    notes: updatedNotes,
                }));
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    useEffect(() => {
        if (ticket._id) {
            getNote();
        }
    }, [ticket._id, refresh]);

    const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes = (ticket.notes || []).slice(indexOfFirstNote, indexOfLastNote);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            {ticket.title ? (
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{ticket.title}</h1>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Description</h2>
                        <p className="text-gray-600">{ticket.description}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Notes</h2>
                        {currentNotes.map((note) => (
                            <div key={note.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                                <div>
                                    <div className="flex items-center mb-2">
                                        <FaUser className="text-gray-500 mr-2" />
                                        <span className="text-sm font-medium text-gray-700">{note.addedBy}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaStickyNote className="text-gray-500 mr-2" />
                                        <p className="text-gray-600">{note.note}</p>
                                    </div>
                                </div>
                                <div className="text-gray-500 text-sm text-right">
                                    {note.timestamp}
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between items-center mt-6">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaArrowLeft className="mr-2" />
                                Previous
                            </button>
                            <span className="text-gray-700">
                                Page {currentPage} of {Math.ceil((ticket.notes?.length || 0) / notesPerPage)}
                            </span>
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === Math.ceil((ticket.notes?.length || 0) / notesPerPage)}
                                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                                <FaArrowRight className="ml-2" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add a Note</h2>
                        <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Enter your note here..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                        />
                        <button
                            onClick={handleAddNote}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                        >
                            <FaPlus className="mr-2" />
                            Add Note
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-600">Loading ticket details...</p>
            )}
        </div>
    );
}