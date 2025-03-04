import { Routes, Route } from "react-router-dom";
import React from 'react'
import Agentlogn from "../pages/agent/Agentlogn";
import ViewAllticket from "../pages/agent/ViewAllticket";
import AgentNote from "../pages/agent/AgentNote";
export default function AgentRoute() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Agentlogn/>}/>
        <Route path='/viewallticket'element={<ViewAllticket/>}/>
        <Route path='/addnotes'element={<AgentNote/>}/>
      </Routes>
    </div>
  )
}
