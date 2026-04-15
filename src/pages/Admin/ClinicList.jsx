import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";

const ClinicList = () => {
  const { clinics, getAllClinics, aToken } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (aToken) {
      getAllClinics();
    }
  }, [aToken]);

  return (
    <div className="m-5 w-full">
      <p className="mb-4 text-lg font-medium">All Clinics</p>

      <div className="bg-white border rounded">

        {/* Header */}
        <div className="grid grid-cols-6 font-medium text-gray-600 px-6 py-3 border-b">
          <p>#</p>
          <p>Image</p>
          <p>Name</p>
          <p>City</p>
          <p>Pincode</p>
          <p>Doctors</p>
        </div>

        {clinics.length === 0 ? (
          <p className="p-6 text-gray-500">No clinics found</p>
        ) : (
          clinics.map((clinic, index) => (
            <div
              key={clinic._id}
              onClick={() => navigate(`/admin/clinic/${clinic._id}`)}
              className="grid grid-cols-6 px-6 py-3 border-b items-center hover:bg-gray-50 cursor-pointer"
            >
              <p>{index + 1}</p>

              <img
                src={clinic.image}
                alt=""
                className="w-10 h-10 rounded object-cover"
              />

              <p>{clinic.name}</p>
              <p>{clinic.city}</p>
              <p>{clinic.pincode}</p>
              <p className="font-semibold">{clinic.doctorCount}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClinicList;