import React, { useContext, useEffect } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { IoTicketOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const {
    doctorData,
    getDoctorProfile,
    appointments,
    getDoctorAppointments,
    dToken,
  } = useContext(DoctorContext);

  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDoctorProfile();
      getDoctorAppointments();
    }
  }, [dToken]);

  // ✅ SAFE slice (no crash)
  const recentAppointments = appointments?.slice(0, 3) || [];

  return (
    <div className="p-4 md:p-6 w-full">

      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">
        Doctor Dashboard
      </h1>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {/* Profile */}
        <div
          onClick={() => navigate("/doctor-profile")}
          className="bg-white border rounded-xl p-5 flex items-center gap-4 hover:shadow-lg hover:scale-[1.02] active:scale-95 transition cursor-pointer"
        >
          <FaUserCircle className="text-4xl text-blue-500" />
          <div>
            <p className="text-lg font-semibold">My Profile</p>
            <p className="text-gray-500 text-sm">View & Edit</p>
          </div>
        </div>

        {/* Appointments */}
        <div
          onClick={() => navigate("/doctor-appointments")}
          className="bg-white border rounded-xl p-5 flex items-center gap-4 hover:shadow-lg hover:scale-[1.02] active:scale-95 transition cursor-pointer"
        >
          <IoTicketOutline className="text-4xl text-green-500" />
          <div>
            <p className="text-lg font-semibold">Appointments</p>
            <p className="text-gray-500 text-sm">Manage bookings</p>
          </div>
        </div>

        {/* Patients */}
        <div
          onClick={() => navigate("/doctor-patients")}
          className="bg-white border rounded-xl p-5 flex items-center gap-4 hover:shadow-lg hover:scale-[1.02] active:scale-95 transition cursor-pointer"
        >
          <FaUserDoctor className="text-4xl text-purple-500" />
          <div>
            <p className="text-lg font-semibold">Patients</p>
            <p className="text-gray-500 text-sm">View patients</p>
          </div>
        </div>

      </div>

      {/* LOWER SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        {/* Doctor Profile Box */}


        {/* Appointment Box */}
        <div
          onClick={() => navigate("/doctor-appointments")}
          className="bg-white border rounded-xl p-6 cursor-pointer hover:shadow-lg hover:scale-[1.01] transition"
        >
          <h2 className="text-lg font-semibold mb-4">
            Recent Appointments
          </h2>

          <div className="space-y-3">
            {recentAppointments.length > 0 ? (
              recentAppointments.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b pb-2"
                >
                  <p>{item.userData?.name}</p>
                  <span className="text-sm text-gray-500">
                    {item.slotTime}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No appointments</p>
            )}
          </div>
        </div>

                <div
          onClick={() => navigate("/doctor-profile")}
          className="bg-white border rounded-xl p-6 cursor-pointer hover:shadow-lg hover:scale-[1.01] transition"
        >
          <h2 className="text-lg font-semibold mb-4">Doctor Profile</h2>

          {doctorData ? (
            <>
              <div className="flex items-center gap-4">
                <img
                  src={doctorData.image || "https://via.placeholder.com/80"}
                  alt="doctor"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{doctorData.name}</p>
                  <p className="text-sm text-gray-500">
                    {doctorData.speciality}
                  </p>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p>Email: {doctorData.email}</p>
                <p>Experience: {doctorData.experience} years</p>
                <p>Fees: {currency}{doctorData.fees}</p>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Loading profile...</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default DoctorDashboard;