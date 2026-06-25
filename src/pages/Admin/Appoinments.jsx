import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { ImCancelCircle } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Appoinments = () => {
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showDoctorFilter, setShowDoctorFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const {
    aToken,
    appointments,
    getAllAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const { calculateAge, currency } = useContext(AppContext);
  const navigate = useNavigate();

  const filteredAppointments = appointments.filter((item) => {
    const matchDate = selectedDate ? item.slotDate === selectedDate : true;
    const matchDoctor = selectedDoctor
      ? item.docData.name === selectedDoctor
      : true;

    return matchDate && matchDoctor;
  });

  const doctorList = [...new Set(appointments.map((a) => a.docData.name))];
  const dateList = [...new Set(appointments.map((a) => a.slotDate))];

  const formatSlotDate = (slotDate) => {
    if (!slotDate) {
      return "";
    }
    const [day, month, year] = slotDate.split("_");
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (aToken) {
      const fetchAppointments = async () => {
        setLoading(true);
        await getAllAppointments();
        setLoading(false);
      };
      fetchAppointments();
    }
  }, [aToken]);

  if (loading) {
    return (
      <div className="w-full m-5 flex flex-col items-center justify-center min-h-[70vh]">
        <AiOutlineLoading3Quarters className="text-5xl animate-spin text-blue-600" />
        <p className="mt-4 text-blue-600 text-lg">Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="w-full m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[80vh] overflow-y-scroll">
        <div className="hidden sm:grid sm:grid-cols-[0.5fr_2fr_1.3fr_2fr_2fr_0.8fr_0.8fr] items-center py-4 px-6 border-b bg-white sticky top-0 z-10">
          {" "}
          <p>#</p>
          <p>Patient</p>
          <p className="">Phone</p>
          <div className="relative flex items-center gap-1">
            <p>Date & Time</p>
            <FiFilter
              className="cursor-pointer"
              onClick={() => setShowDateFilter(!showDateFilter)}
            />

            {showDateFilter && (
              <div className="absolute top-6 left-0 bg-white border rounded shadow p-2 z-20">
                <select
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setShowDateFilter(false);
                  }}
                  className="border px-2 py-1"
                >
                  <option value="">All Dates</option>
                  {dateList.map((date) => (
                    <option key={date} value={date}>
                      {formatSlotDate(date)}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="relative flex items-center gap-1">
            <p>Doctor</p>
            <FiFilter
              className="cursor-pointer"
              onClick={() => setShowDoctorFilter(!showDoctorFilter)}
            />

            {showDoctorFilter && (
              <div className="absolute top-6 left-0 bg-white border rounded shadow p-2 z-20">
                <select
                  value={selectedDoctor}
                  onChange={(e) => {
                    setSelectedDoctor(e.target.value);
                    setShowDoctorFilter(false);
                  }}
                  className="border px-2 py-1"
                >
                  <option value="">All Doctors</option>
                  {doctorList.map((doc) => (
                    <option key={doc} value={doc}>
                      {doc}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <p>Fees</p>
          <p className="text-center">Actions</p>
        </div>

        {appointments.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No appointments found
          </p>
        )}

        {filteredAppointments.map((item, index) => {
          return (
            <div key={item._id}>
              <div className="sm:hidden border-b bg-white">
                <div className="flex items-center justify-between gap-4 px-4 py-4">
                  <div
                    onClick={() => navigate(`/all-appointments/${item._id}`)}
                    className="flex-1"
                  >
                    <p className="font-medium text-sm">{item.userData.name}</p>
                    <p className="text-xs text-gray-500">{item.docData.name}</p>
                  </div>
                  {item.isCompleted ? (
                    <span className="inline-flex items-center rounded-full border border-green-600 bg-green-100 px-3 py-1 text-green-700">
                      <FaCheckCircle className="text-base" />
                      <span className="ml-1 text-xs">Completed</span>
                    </span>
                  ) : item.cancelled ? (
                    <span className="inline-flex items-center rounded-full border border-red-500 bg-red-100 px-3 py-1 text-red-700">
                      <ImCancelCircle className="text-base" />
                      <span className="ml-1 text-xs">Cancelled</span>
                    </span>
                  ) : (
                    <div
                      className="flex items-center gap-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ImCancelCircle
                        onClick={() => cancelAppointment(item._id)}
                        className="text-2xl text-red-500 cursor-pointer"
                      />
                      <FaCheckCircle
                        onClick={() => completeAppointment(item._id)}
                        className="text-2xl text-green-600 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div
                className="hidden sm:grid sm:grid-cols-[0.5fr_2fr_1.3fr_2fr_2fr_0.8fr_0.8fr] items-center py-4 px-6 border-b hover:bg-gray-100 text-gray-600 cursor-pointer"
                onClick={() => navigate(`/all-appointments/${item._id}`)}
              >
                <p className="max-sm:hidden">{index + 1}</p>
                <div className="flex items-center gap-2">
                  <img
                    className="w-8 rounded-full"
                    src={item.userData.image}
                    alt=""
                  />{" "}
                  <p>{item.userData.name}</p>
                </div>
                <p className="whitespace-nowrap">
                  {item.userData?.phone || "N/A"}
                </p>{" "}
                <p className="">
                  {formatSlotDate(item.slotDate)} | {item.slotTime}
                </p>
                <div className="flex items-center gap-2">
                  <img
                    className="w-8 rounded-full bg-gray-200"
                    src={item.docData.image}
                    alt=""
                  />{" "}
                  <p>{item.docData.name}</p>
                </div>
                <p>
                  {currency}
                  {item.amount}
                </p>
                {item.isCompleted ? (
                  <p className="text-green-600 border border-green-600 px-3 py-1 rounded text-center">
                    Completed
                  </p>
                ) : item.cancelled ? (
                  <p className="text-red-500 border border-red-500 px-3 py-1 rounded text-center">
                    Cancelled
                  </p>
                ) : (
                  <div
                    className="flex justify-center gap-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ImCancelCircle
                      onClick={() => cancelAppointment(item._id)}
                      className="text-2xl text-red-500 cursor-pointer"
                    />

                    <FaCheckCircle
                      onClick={() => completeAppointment(item._id)}
                      className="text-2xl text-green-600 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Appoinments;
