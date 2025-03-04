import { Routes, Route } from "react-router-dom";
import React from 'react'
import UserHome from "../pages/User/UserHome";
import UserSignups from "../pages/User/UserSignups";
import UserLogin from "../pages/User/UserLogin";
import Tickets from "../pages/User/Tickets";
import Addnotes from "../pages/User/Addnotes";
import UpdateTicket from "../pages/User/UpdateTicket";
import Home from "../components/Home/Home";

export default function UserRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/"element={<Home/>}/>
        <Route path="/home" element={<UserHome/>}/>
        <Route path="/signup"element={<UserSignups/>}/>
        <Route path="/login"element={<UserLogin/>}/>
        <Route path="/tickets"element={<Tickets/>}/>
        <Route path="/addnote"element={<Addnotes/>}/>
        <Route path="/updateticket"element={<UpdateTicket/>}/>

      </Routes>
    </div>
  )
}
