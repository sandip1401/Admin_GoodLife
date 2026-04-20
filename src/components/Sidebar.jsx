import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>


      {/* Desktop Sidebar (UNCHANGED) */}
      <div className="hidden md:block min-h-screen bg-white border-r">
        {aToken ? (
          <ul className="text-zinc-700 mt-5">
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                }`
              }
            >
              <img src={assets.home_icon} alt="" />
              <p>Dashboard</p>
            </NavLink>

            <NavLink
              to="/all-appointments"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                }`
              }
            >
              <img src={assets.appointment_icon} alt="" />
              <p>Appointments</p>
            </NavLink>

            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                }`
              }
            >
              <img src={assets.add_icon} alt="" />
              <p>Add Doctor</p>
            </NavLink>

            <NavLink
              to="/add-clinic"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                }`
              }
            >
              <img src={assets.add_icon} alt="" />
              <p>Add Clinic</p>
            </NavLink>

            <NavLink
              to="/admin/doctor-list"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                }`
              }
            >
              <img src={assets.people_icon} alt="" />
              <p>Doctors List</p>
            </NavLink>
          </ul>
        ) : dToken ? (
          <ul className="text-zinc-700 mt-5">
            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                }`
              }
            >
              <img src={assets.home_icon} alt="" />
              <p>Dashboard</p>
            </NavLink>

            <NavLink
              to="/doctor-appointments"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                }`
              }
            >
              <img src={assets.appointment_icon} alt="" />
              <p>Appointments</p>
            </NavLink>

            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                }`
              }
            >
              <img src={assets.people_icon} alt="" />
              <p>Profile</p>
            </NavLink>

          </ul>
        ):null}
      </div>


    </>
  );
};

export default Sidebar;
