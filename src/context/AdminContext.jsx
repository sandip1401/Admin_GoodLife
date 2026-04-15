  import axios from "axios";
  import { createContext, useState } from "react";
  import React from "react";
  import { toast } from "react-toastify";

  export const AdminContext = createContext();

  const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(
      localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
    );
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [patients, setPatients] = useState([])
    const [clinicSuggestions, setClinicSuggestions] = useState([]);
  const [showClinicList, setShowClinicList] = useState(false);
  const [clinics, setClinics] = useState([]);


    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDoctors = async () => {
      try {
        const { data } = await axios.get(
          backendUrl + "/api/admin/all-doctors",
          
          { headers:{aToken} }
        );
        if (data.success) {
          setDoctors(data.doctors);
        } else {
          toast.error(data.me);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
  const getAllClinics = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/clinic/list",
        { headers: { aToken } }
      );

      if (data.success) {
        setClinics(data.clinics);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/complete-appointment",
        { appointmentId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };



    const searchClinic = async (value) => {
    try {
      if (!value) {
        setClinicSuggestions([]);
        setShowClinicList(false);
        return;
      }

      const { data } = await axios.get(
        backendUrl + "/api/clinic/search?name=" + value
      );

      if (data.success) {
        setClinicSuggestions(data.clinics);
        setShowClinicList(true);
      } else {
        setClinicSuggestions([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

    const changeAvailability=async(docId)=>{
      try{
          const {data}=await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{aToken}})
          if(data.success){
              toast.success(data.message)
              getAllDoctors()
          }
          else{
              toast.error(data.message)
          }
      }
      catch(error){
          toast.error(error.message)
      }
    }

    const getAllAppointments=async()=>{
      try{
        const {data}=await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}})
        if(data.success){
          setAppointments(data.appointments);
        }
        else{
          toast.error(data.message)
        }

      }
      catch(error){
        toast.error(error.message)
      }
    }

const cancelAppointment = async (appointmentId) => {
  try {
    const { data } = await axios.post(
      backendUrl + "/api/admin/cancel-appointment",
      { appointmentId },
      { headers: { aToken } }
    );

    if (data.success) {
      toast.success(data.message);
      getAllAppointments(); // refresh list
    } else {
      toast.error(data.message); // FIXED
    }
  } catch (error) {
    toast.error(error.message);
  }
};

    const getDashData=async()=>{
      try{
        const {data}=await axios.get(backendUrl+'/api/admin/dashboard',{headers:{aToken}})
        if(data.success){
          setDashData(data.dashData)
        }
        else{
          toast.error(data.message)
        }
      }
      catch(error){ 
        toast.error(error.message)
      }
    }

    const getAllPatients= async()=>{
      try{
        const {data}=await axios.get(backendUrl+'/api/admin/all-patients',{headers:{aToken}})
        if(data.success){
          setPatients(data.patients)
        }
        else{
          toast.error(data.message)
        }
      }
      catch(error){
        toast.error(error.message)

      }
    }

    const getDoctorsByClinic = async (clinicId) => {
  try {
    const { data } = await axios.get(
      backendUrl + "/api/clinic/doctors-by-clinic/" + clinicId
    );

    if (data.success) {
      setDoctors(data.doctors);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

    const value = {
      aToken,
      setAToken,
      backendUrl,
      doctors,
      getAllDoctors,
      changeAvailability,
      setAppointments,
      appointments,
      getAllAppointments,
      cancelAppointment,
      dashData,getDashData,
      getAllPatients,
      patients,
      searchClinic,
    clinicSuggestions,
    showClinicList,
    setShowClinicList,
    clinics,
  getAllClinics,
  completeAppointment,
  getDoctorsByClinic
    };

    return (
      <AdminContext.Provider value={value}>
        {props.children}
      </AdminContext.Provider>
    );
  };

  export default AdminContextProvider;
