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
      {/* Mobile Menu Button */}
      {aToken && (
        <div className="md:hidden w-full px-4 py-3 border-b bg-white sticky top-0 z-40">
          <button
            onClick={() => setOpenMenu(true)}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl text-base font-semibold shadow"
          >
            Menu
          </button>
        </div>
      )}

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

      {/* Mobile Overlay Menu */}
      {openMenu && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Background Blur */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpenMenu(false)}
          ></div>

          {/* Menu Panel */}
          <div className="absolute top-24 left-4 right-4 bg-white rounded-xl shadow-xl p-4 transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Menu</h2>
              <button
                onClick={() => setOpenMenu(false)}
                className="text-gray-500 text-lg"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <NavLink
                to="/admin-dashboard"
                onClick={() => setOpenMenu(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100"
              >
                <img src={assets.home_icon} alt="" />
                Dashboard
              </NavLink>

              <NavLink
                to="/all-appointments"
                onClick={() => setOpenMenu(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100"
              >
                <img src={assets.appointment_icon} alt="" />
                Appointments
              </NavLink>

              <NavLink
                to="/add-doctor"
                onClick={() => setOpenMenu(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100"
              >
                <img src={assets.add_icon} alt="" />
                Add Doctor
              </NavLink>

              <NavLink
                to="/add-clinic"
                onClick={() => setOpenMenu(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100"
              >
                <img src={assets.add_icon} alt="" />
                Add Clinic
              </NavLink>

              <NavLink
                to="/clinic-list"
                onClick={() => setOpenMenu(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100"
              >
                <img src={assets.people_icon} alt="" />
                Clinics List
              </NavLink>

              <NavLink
                to="/admin/doctor-list"
                onClick={() => setOpenMenu(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100"
              >
                <img src={assets.people_icon} alt="" />
                Doctors List
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
