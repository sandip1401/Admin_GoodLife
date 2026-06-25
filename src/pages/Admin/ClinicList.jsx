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

        {/* Desktop Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_0.9fr_2fr_1fr_1fr_0.8fr] font-medium text-gray-600 px-6 py-3 border-b">
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
            <div key={clinic._id}>
              <div
                onClick={() => navigate(`/admin/clinic/${clinic._id}`)}
                className="hidden sm:grid grid-cols-[0.5fr_0.9fr_2fr_1fr_1fr_0.8fr] px-6 py-4 border-b items-center hover:bg-gray-50 cursor-pointer"
              >
                <p>{index + 1}</p>

                <img
                  src={clinic.image}
                  alt=""
                  className="w-10 h-10 rounded object-cover"
                />

                <p className="truncate">{clinic.name}</p>
                <p className="truncate">{clinic.city}</p>
                <p className="truncate">{clinic.pincode}</p>
                <p className="font-semibold">{clinic.doctorCount}</p>
              </div>

              <div
                onClick={() => navigate(`/admin/clinic/${clinic._id}`)}
                className="sm:hidden p-4 border-b hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={clinic.image}
                    alt=""
                    className="w-16 h-16 rounded object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-sm text-slate-900 truncate">
                        {clinic.name}
                      </p>
                      <span className="text-xs font-semibold text-slate-500">
                        #{index + 1}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 truncate">
                      {clinic.city} · {clinic.pincode}
                    </p>
                    <p className="text-xs text-slate-600 truncate">
                      Doctors: <span className="font-semibold">{clinic.doctorCount}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClinicList;