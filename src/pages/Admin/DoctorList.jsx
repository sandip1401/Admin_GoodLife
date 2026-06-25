import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);
  const [doctorsLoading, setDoctorsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (aToken) {
      const fetchDoctors = async () => {
        setDoctorsLoading(true);
        await getAllDoctors();
        setDoctorsLoading(false);
      };
      fetchDoctors();
    }
  }, [aToken]);

  if (doctorsLoading && doctors.length === 0) {
    return (
      <div className="m-5 flex flex-col items-center justify-center min-h-[70vh]">
        <AiOutlineLoading3Quarters className="text-5xl animate-spin text-blue-600" />
        <p className="mt-4 text-blue-600 text-lg">Loading doctors...</p>
      </div>
    );
  }

  return (
    <div className="m-5">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item, index) => {
          return (
            <div
              onClick={() => navigate(`/admin/doctor/${item._id}`)}
              className="border border-indigo-200 rounded-xl max-w-56 cursor-pointer overflow-hidden"
              key={index}
            >
              {" "}
              <img
                className=" hover:bg-blue-500 transition-all duration-300"
                src={item.image}
                alt=""
              />
              <p className="pl-3">{item.name}</p>
              <p className="pl-3">{item.speciality}</p>
              <div
                className="flex gap-1 pl-3 mb-1"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                />
                <p>Available</p>
              </div>
            </div>
          );
        })}
      </div>
      {doctors.length === 0 && !doctorsLoading && (
        <p className="mt-6 text-gray-500">No doctors found.</p>
      )}
    </div>
  );
};

export default DoctorList;
