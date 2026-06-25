import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Appoinments from "./pages/Admin/Appoinments";
import AppointmentDetails from "./pages/Admin/AppointmentDetails";
import AddDoctor from "./pages/Admin/AddDoctor";
import Dashboard from "./pages/Admin/Dashboard";
import DoctorList from "./pages/Admin/DoctorList";
import AddClinic from "./pages/Admin/AddClinic";
import ClinicList from "./pages/Admin/ClinicList";
import DoctorDetails from "./pages/Admin/DoctorDetails";
import ClinicDoctors from "./pages/Admin/ClinicDoctors";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import { DoctorContext } from "./context/DoctorContext";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const navigate = useNavigate();

useEffect(() => {
  if (window.location.pathname === "/") {
    if (aToken) {
      navigate("/admin-dashboard");
    } else if (dToken) {
      navigate("/doctor-dashboard");
    }
  }
}, [aToken, dToken]);
  return aToken || dToken ? (
    <div className="bg-blue-50 min-h-screen">
      <ToastContainer />
      <Navbar />
      <div className="flex">
        <Sidebar />
        
        <Routes>
          <Route path="/" element={aToken ? <Dashboard /> : <DoctorDashboard />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<Appoinments />} />
          <Route path="/all-appointments/:id" element={<AppointmentDetails />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/admin/doctor-list" element={<DoctorList />} />
          <Route path="/add-clinic" element={<AddClinic />} />
          <Route path="/clinic-list" element={<ClinicList />} />
          <Route path="/admin/doctor/:id" element={<DoctorDetails />} />
          <Route path="/admin/update-doctor/:id" element={<AddDoctor />} />
          <Route path="/admin/clinic/:id" element={<ClinicDoctors />} />
          <Route path="/admin/update-clinic/:id" element={<AddClinic />} />

          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />

          
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
