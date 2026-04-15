import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

const DoctorDetails = () => {
  const { id } = useParams();
  const { doctors, getAllDoctors } = useContext(AdminContext);

  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    if (!doctors || doctors.length === 0) {
      getAllDoctors();
    }
  }, []);

  useEffect(() => {
    const foundDoctor = doctors.find((doc) => doc._id === id);
    if (foundDoctor) {
      setDoctor(foundDoctor);
    }
  }, [doctors, id]);

  if (!doctor) {
    return <p className="m-6 text-gray-500">Loading doctor details...</p>;
  }

  return (
    <div className="w-full px-12 py-8">
      <div className="bg-white rounded-2xl shadow-lg border p-10">
        {/* Header */}
        <div className="flex gap-10 items-start">
          {/* Image */}
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-80 h-80 object-cover rounded-xl border"
          />

          {/* Main Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-semibold">{doctor.name}</h1>
            <button
              onClick={() => navigate(`/admin/update-doctor/${doctor._id}`)}
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Edit Doctor
            </button>
            <p className="text-blue-600 text-lg mb-6">{doctor.speciality}</p>

            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div className="border rounded-lg px-4 py-3 bg-gray-50">
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-medium">{doctor.email}</p>
              </div>

              <div className="border rounded-lg px-4 py-3 bg-gray-50">
                <p className="text-gray-500 text-sm">City</p>
                <p className="font-medium">{doctor.city}</p>
              </div>

              <div className="border rounded-lg px-4 py-3 bg-gray-50">
                <p className="text-gray-500 text-sm">Degree</p>
                <p className="font-medium">{doctor.degree}</p>
              </div>

              <div className="border rounded-lg px-4 py-3 bg-gray-50">
                <p className="text-gray-500 text-sm">Experience</p>
                <p className="font-medium">{doctor.experience} Years</p>
              </div>

              <div className="border rounded-lg px-4 py-3 bg-gray-50">
                <p className="text-gray-500 text-sm">Consultation Fee</p>
                <p className="font-medium">₹ {doctor.fees}</p>
              </div>

              <div className="border rounded-lg px-4 py-3 bg-gray-50">
                <p className="text-gray-500 text-sm">Status</p>
                <p
                  className={`font-medium ${
                    doctor.available ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {doctor.available ? "Available" : "Not Available"}
                </p>
              </div>

              <div className="border rounded-lg px-4 py-3 bg-gray-50 col-span-2">
                <p className="text-gray-500 text-sm">Clinic Address</p>
                <p className="font-medium">{doctor.address1}</p>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-3">About Doctor</h2>
          <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
        </div>

        {/* Achievement */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Achievements</h2>
          <p className="text-gray-600">{doctor.achievement}</p>
        </div>

        {/* Manager Contacts */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Manager Contacts</h2>
          <div className="grid grid-cols-3 gap-4">
            {doctor.managerContacts?.length > 0 ? (
              doctor.managerContacts.map((contact, index) => (
                <div
                  key={index}
                  className="border rounded-lg px-4 py-3 bg-gray-50"
                >
                  {contact}
                </div>
              ))
            ) : (
              <p>No contacts added</p>
            )}
          </div>
        </div>

        {/* Weekly Availability */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Doctor Schedule</h2>

          <div className="grid grid-cols-3 gap-6">
            {doctor.weeklyAvailability?.length > 0 ? (
              doctor.weeklyAvailability.map((slot, index) => (
                <div key={index} className="border rounded-xl p-5 bg-gray-50">
                  <p className="font-semibold mb-2">{slot.day}</p>
                  <p className="text-sm text-gray-600">
                    {slot.startTime} - {slot.endTime}
                  </p>
                  <p className="text-sm mt-2">{slot.recurrenceType}</p>

                  {slot.interval && (
                    <p className="text-sm">Every {slot.interval} days</p>
                  )}

                  {slot.startDate && (
                    <p className="text-sm">Start: {slot.startDate}</p>
                  )}
                </div>
              ))
            ) : (
              <p>No schedule added</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
