import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { ImCancelCircle } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";

const DoctorAppointments = () => {
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const {
    dToken,
    appointments,
    getDoctorAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);

  const { currency } = useContext(AppContext);

  // ✅ Format date
  const formatSlotDate = (slotDate) => {
    if (!slotDate) return "";
    const [day, month, year] = slotDate.split("_");
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // ✅ Convert time to sortable value
  const convertTime = (time) => {
    if (!time) return 0;
    const [hourMin, modifier] = time.split(" ");
    let [hours, minutes] = hourMin.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = parseInt(hours) + 12;
    }
    if (modifier === "AM" && hours === "12") {
      hours = 0;
    }

    return parseInt(hours) * 60 + parseInt(minutes);
  };

  // ✅ Filter + Sort
  const filteredAppointments = appointments
    .filter((item) =>
      selectedDate ? item.slotDate === selectedDate : true
    )
    .sort((a, b) => convertTime(a.slotTime) - convertTime(b.slotTime));

  // ✅ Unique dates
  const dateList = [...new Set(appointments.map((a) => a.slotDate))];

  useEffect(() => {
    if (dToken) {
      getDoctorAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full m-5">
      <p className="mb-3 text-lg font-medium">My Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[80vh] overflow-y-scroll">

        {/* ===== MOBILE FILTER ===== */}
        <div className="sm:hidden p-4 border-b flex justify-between items-center relative">
          <p className="font-medium">Filter</p>
          <FiFilter
            className="cursor-pointer"
            onClick={() => setShowDateFilter(!showDateFilter)}
          />

          {showDateFilter && (
            <div className="absolute top-12 right-2 bg-white border rounded shadow p-2 z-20">
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

        {/* ===== DESKTOP HEADER ===== */}
        <div className="hidden sm:grid sm:grid-cols-[0.5fr_2fr_1.3fr_2fr_0.8fr_0.8fr] items-center py-4 px-6 border-b bg-white sticky top-0 z-10">
          <p>#</p>
          <p>Patient</p>
          <p>Phone</p>

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

          <p>Fees</p>
          <p className="text-center">Actions</p>
        </div>

        {/* Empty */}
        {filteredAppointments.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No appointments found
          </p>
        )}

        {/* List */}
        {filteredAppointments.map((item, index) => (
          <div key={item._id}>

            {/* DESKTOP */}
            <div className="hidden sm:grid sm:grid-cols-[0.5fr_2fr_1.3fr_2fr_0.8fr_0.8fr] items-center py-4 px-6 border-b hover:bg-gray-100 text-gray-600">
              <p>{index + 1}</p>

              <div className="flex items-center gap-2">
                <img className="w-8 rounded-full" src={item.userData.image} alt="" />
                <p>{item.userData.name}</p>
              </div>

              <p>{item.userData?.phone || "N/A"}</p>

              <p>
                {formatSlotDate(item.slotDate)} | {item.slotTime}
              </p>

              <p>{currency}{item.amount}</p>

              {item.isCompleted ? (
                <p className="text-green-600 border border-green-600 px-3 py-1 rounded text-center">
                  Completed
                </p>
              ) : item.cancelled ? (
                <p className="text-red-500 border border-red-500 px-3 py-1 rounded text-center">
                  Cancelled
                </p>
              ) : (
                <div className="flex justify-center gap-4">
                  <ImCancelCircle onClick={() => cancelAppointment(item._id)} className="text-2xl text-red-500 cursor-pointer" />
                  <FaCheckCircle onClick={() => completeAppointment(item._id)} className="text-2xl text-green-600 cursor-pointer" />
                </div>
              )}
            </div>

            {/* MOBILE */}
            <div className="sm:hidden border-b px-4 py-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{item.userData.name}</p>
                <p className="text-sm text-gray-500">
                  {formatSlotDate(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              <div>
                {item.isCompleted ? (
                  <p className="text-green-600 text-sm">Completed</p>
                ) : item.cancelled ? (
                  <p className="text-red-500 text-sm">Cancelled</p>
                ) : (
                  <div className="flex gap-5">
                    <ImCancelCircle onClick={() => cancelAppointment(item._id)} className="text-2xl text-red-500 cursor-pointer" />
                    <FaCheckCircle onClick={() => completeAppointment(item._id)} className="text-2xl text-green-600 cursor-pointer" />
                  </div>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;