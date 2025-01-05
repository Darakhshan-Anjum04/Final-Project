import React from "react";
import "./Admin.css";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import AddSong from "./AddSong";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addsong" element={<AddSong />} />
      </Routes>
    </div>
  );
};

export default Admin;