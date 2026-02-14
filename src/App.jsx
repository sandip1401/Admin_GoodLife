import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Appoinments from "./pages/Admin/Appoinments";
import AddDoctor from "./pages/Admin/AddDoctor";
import Dashboard from "./pages/Admin/Dashboard";
import DoctorList from "./pages/Admin/DoctorList";

const App = () => {
  const {aToken}=useContext(AdminContext);
  return aToken ? (
    <div className="bg-blue-50 min-h-screen">
      <ToastContainer/>
      <Navbar/>
      <div className="flex">
        <Sidebar/>
         <Routes>
          <Route path="/" element={<></>}/>
          <Route path="/admin-dashboard" element={<Dashboard/>}/>
          <Route path="/all-appointments" element={<Appoinments/>}/>
          <Route path="/add-doctor" element={<AddDoctor/>}/>
          <Route path="/doctor-list" element={<DoctorList/>}/>
         </Routes>
      </div>
    </div>
  ):(
    <>
    <Login />
    <ToastContainer/>
    </>
  )
};

export default App;
