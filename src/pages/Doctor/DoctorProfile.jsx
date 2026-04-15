import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {
  const { doctorData, getDoctorProfile } = useContext(DoctorContext);

  useEffect(() => {
    getDoctorProfile();
  }, []);

  if (!doctorData) {
    return <p className="m-6 text-gray-500">Loading doctor profile...</p>;
  }

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8">
      <div className="bg-white rounded-2xl shadow-lg border p-5 md:p-8 lg:p-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center lg:items-start">

          {/* Image */}
          <img
            src={doctorData.image}
            alt={doctorData.name}
            className="w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 object-cover rounded-xl border"
          />

          {/* Main Info */}
          <div className="flex-1 w-full">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center lg:text-left">
              {doctorData.name}
            </h1>

            <p className="text-blue-600 text-base md:text-lg mb-4 md:mb-6 text-center lg:text-left">
              {doctorData.speciality}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">

              <div className="border rounded-lg px-4 py-3 bg-gray-50">
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-medium break-words">{doctorData.email}</p>
              </div>

              <div className="border rounded-lg px-4 py-3 bg-gray-50">
                <p className="text-gray-500 text-sm">City</p>
                <p className="font-medium">{doctorData.city}</p>
              </div>

              <div className="border rounded-lg px-4 py-3 bg-gray-50">
                <p className="text-gray-500 text-sm">Degree</p>
                <p className="font-medium">{doctorData.degree}</p>
              </div>

              <div className="border rounded-lg px-4 py-3 bg-gray-50">
                <p className="text-gray-500 text-sm">Experience</p>
                <p className="font-medium">
                  {doctorData.experience} Years
                </p>
              </div>

              <div className="border rounded-lg px-4 py-3 bg-gray-50">
                <p className="text-gray-500 text-sm">Consultation Fee</p>
                <p className="font-medium">₹ {doctorData.fees}</p>
              </div>

              <div className="border rounded-lg px-4 py-3 bg-gray-50">
                <p className="text-gray-500 text-sm">Status</p>
                <p
                  className={`font-medium ${
                    doctorData.available
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {doctorData.available ? "Available" : "Not Available"}
                </p>
              </div>

              <div className="border rounded-lg px-4 py-3 bg-gray-50 sm:col-span-2">
                <p className="text-gray-500 text-sm">Clinic Address</p>
                <p className="font-medium break-words">
                  {doctorData.address1 || doctorData.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-8 md:mt-12">
          <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
            About Doctor
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {doctorData.about}
          </p>
        </div>

        {/* Achievement */}
        <div className="mt-8 md:mt-10">
          <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
            Achievements
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            {doctorData.achievement}
          </p>
        </div>

        {/* Manager Contacts */}
        <div className="mt-8 md:mt-10">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Manager Contacts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctorData.managerContacts?.length > 0 ? (
              doctorData.managerContacts.map((contact, index) => (
                <div
                  key={index}
                  className="border rounded-lg px-4 py-3 bg-gray-50 break-words"
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
        <div className="mt-8 md:mt-12">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Doctor Schedule
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {doctorData.weeklyAvailability?.length > 0 ? (
              doctorData.weeklyAvailability.map((slot, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-4 md:p-5 bg-gray-50"
                >
                  <p className="font-semibold mb-2">{slot.day}</p>

                  <p className="text-sm text-gray-600">
                    {slot.startTime} - {slot.endTime}
                  </p>

                  <p className="text-sm mt-2">
                    {slot.recurrenceType}
                  </p>

                  {slot.interval && (
                    <p className="text-sm">
                      Every {slot.interval} days
                    </p>
                  )}

                  {slot.startDate && (
                    <p className="text-sm">
                      Start: {slot.startDate}
                    </p>
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

export default DoctorProfile;