import { Routes, Route } from "react-router-dom";
import React from 'react'
import AdminLogin from "../pages/admin/AdminLogin";
import AdminHome from "../pages/admin/AdminHome";
import AdminViewticket from "../pages/admin/AdminViewticket";
import Adminaddnote from "../pages/admin/Adminaddnote";
import FindUser from "../pages/admin/FindUser";
export default function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<AdminLogin/>}/>
        <Route path="/home" element={<AdminHome/>}/>
        <Route path="/viewalltickets" element={<AdminViewticket/>}/>
        <Route path="/adminaddnote" element={<Adminaddnote/>}/>
        <Route path="/finduser" element={<FindUser/>}/>
      </Routes>
    </div>
  )
}
