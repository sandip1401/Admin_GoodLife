import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { ImCancelCircle } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { aToken, appointments, getAllAppointments, cancelAppointment, completeAppointment } = useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    if (appointments.length === 0 && aToken) {
      const loadAppointments = async () => {
        setLoading(true);
        await getAllAppointments();
        setLoading(false);
      };
      loadAppointments();
    }
  }, [appointments.length, aToken, getAllAppointments]);

  useEffect(() => {
    const found = appointments.find((item) => item._id === id);
    setAppointment(found || null);
  }, [appointments, id]);

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

  const pastAppointments = appointment
    ? appointments.filter(
        (past) =>
          past.userData?._id === appointment.userData?._id && past._id !== appointment._id,
      )
    : [];

  if (loading) {
    return (
      <div className="w-full m-5 flex flex-col items-center justify-center min-h-[70vh]">
        <AiOutlineLoading3Quarters className="text-5xl animate-spin text-blue-600" />
        <p className="mt-4 text-blue-600 text-lg">Loading appointment...</p>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="m-5">
        <button
          className="mb-4 px-4 py-2 rounded bg-blue-500 text-white"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="text-lg font-medium">Appointment not found.</p>
          <p className="text-gray-500 mt-2">Please return to the appointments list.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="m-5">
      <button
        className="mb-4 px-4 py-2 rounded bg-blue-500 text-white"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <div className="grid gap-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-2xl font-semibold">{appointment.userData?.name || "Patient"}</p>
              <p className="text-sm text-gray-500">Appointment ID: {appointment._id}</p>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${
                appointment.isCompleted
                  ? "bg-green-100 text-green-700"
                  : appointment.cancelled
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {appointment.isCompleted
                ? "Completed"
                : appointment.cancelled
                ? "Cancelled"
                : "Pending"}
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Patient</p>
              <p className="font-medium">{appointment.userData?.name || "N/A"}</p>
              <p className="text-sm text-gray-600">{appointment.userData?.phone || "N/A"}</p>
              {appointment.userData?.dob && (
                <p className="text-sm text-gray-600">Age: {calculateAge(appointment.userData.dob)}</p>
              )}
            </div>

            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Doctor</p>
              <p className="font-medium">{appointment.docData?.name || "N/A"}</p>
              <p className="text-sm text-gray-600">{appointment.docData?.speciality || "N/A"}</p>
            </div>

            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Date & Time</p>
              <p className="font-medium">{formatSlotDate(appointment.slotDate)} | {appointment.slotTime}</p>
            </div>

            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Fees</p>
              <p className="font-medium">{currency}{appointment.amount}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Booking From</p>
              <p>{appointment.bookingSource || "Admin Portal"}</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Payment Status</p>
              <p>{appointment.paymentStatus || "Not available"}</p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-gray-100 bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Notes</p>
            <p className="text-gray-700">{appointment.notes || "No additional notes"}</p>
          </div>

          {!appointment.isCompleted && !appointment.cancelled && (
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => completeAppointment(appointment._id)}
                className="px-4 py-2 rounded bg-green-600 text-white"
              >
                Mark Complete
              </button>
              <button
                onClick={() => cancelAppointment(appointment._id)}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                Cancel Appointment
              </button>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-lg font-semibold mb-4">Past appointments for {appointment.userData?.name}</p>
          {pastAppointments.length === 0 ? (
            <p className="text-gray-500">No past appointments found.</p>
          ) : (
            <div className="space-y-3">
              {pastAppointments.map((past) => (
                <div key={past._id} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">{formatSlotDate(past.slotDate)} | {past.slotTime}</p>
                      <p className="text-sm text-gray-500">{past.docData?.name}</p>
                    </div>
                    <span className={`text-xs font-semibold uppercase px-3 py-1 rounded-full ${
                      past.isCompleted
                        ? "bg-green-100 text-green-700"
                        : past.cancelled
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {past.isCompleted ? "Completed" : past.cancelled ? "Cancelled" : "Pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
