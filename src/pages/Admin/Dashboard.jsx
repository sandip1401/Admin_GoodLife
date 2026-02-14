import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { FaUserDoctor } from "react-icons/fa6";
import { IoTicketOutline } from "react-icons/io5";
import { IoIosMan } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { aToken, getDashData, dashData, getAllPatients,patients } = useContext(AdminContext);
  const navigate = useNavigate();

  const [showPatients, setShowPatients] = useState(false);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  const handlePatientsClick = async () => {
    console.log("first")
    if (!showPatients) {
      await getAllPatients(); // fetch only once
    }
    setShowPatients(!showPatients);
  };


  return (
    dashData && (
      <div className="m-5 w-full max-w-5xl  h-[calc(100vh-80px)] flex flex-col">

        {/* ===== TOP CARDS ===== */}
        <div className="flex flex-wrap gap-4">

          {/* Doctors */}
          <div
            onClick={() => navigate("/doctor-list")}
            className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border cursor-pointer hover:scale-105 active:scale-100 transition"
          >
            <FaUserDoctor className="text-4xl text-blue-400" />
            <div>
              <p className="text-lg font-semibold">{dashData.doctors}</p>
              <p className="text-gray-500">Doctors</p>
            </div>
          </div>

          {/* Appointments */}
          <div
            onClick={() => navigate("/all-appointments")}
            className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border cursor-pointer hover:scale-105 active:scale-100 transition"
          >
            <IoTicketOutline className="text-4xl text-green-400" />
            <div>
              <p className="text-lg font-semibold">{dashData.appointments}</p>
              <p className="text-gray-500">Appointments</p>
            </div>
          </div>

          {/* Patients */}
          <div
            onClick={handlePatientsClick}
            className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border cursor-pointer hover:scale-105 active:scale-100 transition"
          >
            <IoIosMan className="text-4xl text-purple-400" />
            <div>
              <p className="text-lg font-semibold">{dashData.patients}</p>
              <p className="text-gray-500">Patients</p>
            </div>
          </div>

        </div>

        {/* ===== PATIENT LIST (INLINE) ===== */}
        {showPatients && (
  <div className="mt-8 bg-white border rounded flex-1 overflow-hidden flex flex-col">

    {/* Header */}
    <div className="px-6 py-4 border-b">
      <p className="text-lg font-medium">All Patients</p>
    </div>

    {/* Column titles */}
    <div className="grid grid-cols-4 font-medium text-gray-600 px-6 py-2 border-b">
      <p>#</p>
      <p>Name</p>
      <p>Email</p>
      <p>Phone</p>
    </div>

    {/* Scrollable list */}
    <div className="flex-1 overflow-y-auto">
      {patients.length === 0 && (
        <p className="text-center py-10 text-gray-500">
          No patients found
        </p>
      )}

      {patients.map((patient, index) => (
        <div
          key={patient._id}
          className="grid grid-cols-4 px-6 py-3 border-b text-gray-700 hover:bg-gray-50"
        >
          <p>{index + 1}</p>
          <p>{patient.name}</p>
          <p>{patient.email}</p>
          <p>{patient.phone}</p>
        </div>
      ))}
    </div>

  </div>
)}


      </div>
    )
  );
};

export default Dashboard;
