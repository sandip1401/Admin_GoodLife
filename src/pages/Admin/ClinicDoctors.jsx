import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

const ClinicDoctors = () => {
  const { id } = useParams();
  const { doctors, getDoctorsByClinic, clinics } = useContext(AdminContext);

  const navigate = useNavigate();

useEffect(() => {
  if (id) {
    getDoctorsByClinic(id);
  }
}, [id]);

  const clinic = clinics.find((clinic) => clinic._id === id);

  return (
    <div className="m-5 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <p className="text-lg font-medium">
          Doctors of {clinic?.name || "this Clinic"}
        </p>
        <button
          onClick={() => navigate(`/admin/update-clinic/${id}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Edit Clinic
        </button>
      </div>

      <div className="bg-white border rounded">

        <div className="grid grid-cols-4 px-6 py-3 border-b font-medium text-gray-600">
          <p>#</p>
          <p>Name</p>
          <p>Speciality</p>
          <p>Experience</p>
        </div>

        {doctors.length === 0 ? (
          <p className="p-6 text-gray-500">No doctors found</p>
        ) : (
          doctors.map((doc, index) => (
            <div
  key={doc._id}
  onClick={() => navigate(`/admin/doctor/${doc._id}`)}
  className="grid grid-cols-4 px-6 py-3 border-b cursor-pointer hover:bg-gray-50"
>
              <p>{index + 1}</p>
              <p>{doc.name}</p>
              <p>{doc.speciality}</p>
              <p>{doc.experience}</p>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default ClinicDoctors;