import axios from "axios";
import { createContext, useState } from "react";
import React from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "",
  );

  const [doctorData, setDoctorData] = useState(false);
  const [appointments, setAppointments] = useState([]); // ✅ important

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ================= PROFILE =================
  const getDoctorProfile = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: { dToken },
      });

      if (data.success) {
        setDoctorData(data.doctor);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= APPOINTMENTS =================
  const getDoctorAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        { headers: { dToken } },
      );

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= COMPLETE =================
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { dToken } },
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorAppointments(); // refresh
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= CANCEL =================
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { dToken } },
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorAppointments(); // refresh
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,

    doctorData,
    getDoctorProfile,

    appointments,
    setAppointments,
    getDoctorAppointments,

    completeAppointment,
    cancelAppointment,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
