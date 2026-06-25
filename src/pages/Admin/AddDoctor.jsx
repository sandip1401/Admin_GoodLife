import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AddDoctor = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const isEdit = !!id;

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [education, setEducation] = useState("");
  const [degree, setDegree] = useState("");
  const [city, setCity] = useState("");
  const [managerContacts, setManagerContacts] = useState([""]);
  const [adddress1, setAddress1] = useState("");
  const [adddress2, setAddress2] = useState("");
  const [clinicId, setClinicId] = useState("");
  const [achievement, setaAchievement] = useState("");
  const [clinicImg, setClinicImg] = useState(false);

  const normalizeManagerContacts = (contacts) => {
    if (Array.isArray(contacts)) {
      return contacts.map(String).filter(Boolean);
    }

    if (!contacts) {
      return [""];
    }

    if (typeof contacts === "string") {
      try {
        const parsed = JSON.parse(contacts);
        if (Array.isArray(parsed)) {
          return parsed.map(String).filter(Boolean);
        }
      } catch (err) {
        // fall through
      }

      return contacts
        .replace(/^[\[\]\s"]+|[\[\]\s"]+$/g, "")
        .split(",")
        .map((item) => item.trim().replace(/^"|"$/g, ""))
        .filter(Boolean);
    }

    return [String(contacts)];
  };

  // ✅ Weekly Availability State
  const [weeklyAvailability, setWeeklyAvailability] = useState([
    { day: "", startTime: "", endTime: "" },
  ]);

  const {
    backendUrl,
    aToken,
    searchClinic,
    clinicSuggestions,
    showClinicList,
    setShowClinicList,
    doctors,
    getAllDoctors,
    getAllClinics,
    getDoctorsByClinic,
  } = useContext(AdminContext);
  const [submitLoading, setSubmitLoading] = useState(false);

  const getCurrentLocationLink = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const liveMapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
      setAddress2(liveMapLink);
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setSubmitLoading(true);

    try {
      if (!docImg) {
        toast.error("Image not Selected");
        return;
      }

      // ✅ ADD THIS VALIDATION HERE
      for (let slot of weeklyAvailability) {
        if (!slot.day || !slot.startTime || !slot.endTime) {
          return toast.error("Please fill all availability fields");
        }

        if (slot.startTime >= slot.endTime) {
          return toast.error("End time must be greater than start time");
        }
      }

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("city", city);
      formData.append("address1", adddress1);
      formData.append("address2", adddress2);
      formData.append("education", education);
      formData.append("achievement", achievement);

      // ✅ send availability as JSON string
      formData.append("weeklyAvailability", JSON.stringify(weeklyAvailability));

      formData.append("managerContacts", JSON.stringify(managerContacts));

      if (isEdit) {
        const formData = new FormData();

        formData.append("doctorId", id);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("city", city);
        formData.append("fees", fees);
        formData.append("experience", experience);
        formData.append("about", about);
        formData.append("achievement", achievement);
        formData.append("address1", adddress1);
        formData.append("address2", adddress2);
        formData.append("clinicId", clinicId);
        if (password) {
          formData.append("password", password);
        }

        const { data } = await axios.post(
          backendUrl + "/api/admin/update-doctor",
          formData,
          { headers: { aToken } },
        );

        if (data.success) {
          toast.success("Doctor Updated Successfully");
          // refresh admin lists so clinic reassignment reflects immediately
          try {
            getAllDoctors && getAllDoctors();
            getAllClinics && getAllClinics();
            const prev = data.previousClinicId || null;
            const newClinic = data.doctor?.clinicId
              ? String(data.doctor.clinicId)
              : clinicId || null;

            if (prev && prev !== newClinic) {
              getDoctorsByClinic && getDoctorsByClinic(prev);
            }

            if (newClinic) {
              getDoctorsByClinic && getDoctorsByClinic(newClinic);
            }
          } catch (e) {
            // ignore
          }
          navigate("/admin/doctor-list");
        } else {
          toast.error(data.message);
        }

        return;
      } else {
        const { data } = await axios.post(
          backendUrl + "/api/admin/add-doctor",
          formData,
          { headers: { aToken } },
        );

        if (data.success) {
          toast.success("Doctor Added Successfully");
          navigate(`/admin/doctor/${data.doctor._id}`);
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
        toast.error("Something went wrong");
      } finally {
        setSubmitLoading(false);
      }
    };
  useEffect(() => {
    if (isEdit && doctors.length > 0) {
      const doctor = doctors.find((doc) => doc._id === id);

      if (doctor) {
        setDocImg(doctor.image || false);
        setName(doctor.name || "");
        setEmail(doctor.email || "");
        setPassword(""); // usually we don't show old password
        setSpeciality(doctor.speciality || "");
        setDegree(doctor.degree || "");
        setExperience(doctor.experience || "");
        setAbout(doctor.about || "");
        setFees(doctor.fees || "");
        setCity(doctor.city || "");
        setAddress1(doctor.address1 || "");
        setAddress2(doctor.address2 || "");
        setClinicId(doctor.clinicId || "");
        setEducation(doctor.education || "");
        setManagerContacts(normalizeManagerContacts(doctor.managerContacts));
        setaAchievement(doctor.achievement || "");

        setWeeklyAvailability(
          doctor.weeklyAvailability?.length
            ? doctor.weeklyAvailability
            : [{ day: "", startTime: "", endTime: "" }],
        );
      }
    }
  }, [id, doctors]);

  return (
    <form onSubmit={onSubmitHandler} className="m-3 sm:m-5 w-full">
      {" "}
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-4 sm:px-6 md:px-8 py-6 border rounded-md w-full max-w-4xl">
        {/* Image Upload */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 text-gray-500">
          {/* Doctor Image */}
          <div className="flex items-center gap-4">
            <label htmlFor="doc-img">
              <img
                className="w-16 h-16 bg-gray-100 rounded-full cursor-pointer object-cover"
                src={
                  docImg
                    ? docImg instanceof File
                      ? URL.createObjectURL(docImg)
                      : docImg
                    : assets.upload_area
                }
                alt=""
              />
            </label>
            <input
              onChange={(e) => setDocImg(e.target.files[0])}
              type="file"
              id="doc-img"
              hidden
            />
            <p>Doctor picture</p>
          </div>
        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-gray-600">
          {/* Doctor Name */}
          <div>
            <p>Doctor name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              type="text"
              required
            />
          </div>

          {/* Email */}
          <div>
            <p>Doctor Email</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              type="email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <p>Doctor Password</p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              type="password"
              required={!isEdit}
            />
          </div>

          {/* Experience */}
          <div>
            <p>Experience</p>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
              <option value="3 Year">3 Year</option>
              <option value="4 Year">4 Year</option>
              <option value="5 Year">5 Year</option>
              <option value="6 Year">6 Year</option>
              <option value="7 Year">7 Year</option>
              <option value="8 Year">8 Year</option>
              <option value="9 Year">9 Year</option>
              <option value="10 Year">10 Year</option>
              <option value="11 Year">11 Year</option>
              <option value="12 Year">12 Year</option>
              <option value="13 Year">13 Year</option>
              <option value="14 Year">14 Year</option>
              <option value="15 Year">15 Year</option>
              <option value="16 Year">16 Year</option>
              <option value="17 Year">17 Year</option>
              <option value="18 Year">18 Year</option>
              <option value="19 Year">19 Year</option>
              <option value="20 Year+">20 Year+</option>
            </select>
          </div>

          {/* Fees */}
          <div>
            <p>Fees</p>
            <input
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              type="string"
              required
            />
          </div>

          {/* Speciality */}
          <div>
            <p>Speciality</p>
            <select
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="General physician">
                General physician ( সাধারণ চিকিৎসক )
              </option>
              <option value="Gynecologist">
                Gynecologist ( স্ত্রীরোগ বিশেষজ্ঞ )
              </option>
              <option value="Dermatologist">
                Dermatologist ( ত্বক বিশেষজ্ঞ )
              </option>
              <option value="Pediatricians">
                Pediatricians ( শিশু বিশেষজ্ঞ )
              </option>
              <option value="Neurologist">
                Neurologist ( স্নায়ু বিশেষজ্ঞ )
              </option>
              <option value="Neuropsychiatrist">
                Neuropsychiatrist ( স্নায়ু ও মনোরোগ বিশেষজ্ঞ )
              </option>
              <option value="Dentist">Dentist ( দন্ত বিশেষজ্ঞ )</option>
              <option value="Gastroenterologist">
                Gastroenterologist ( পাকস্থলী ও হজম বিশেষজ্ঞ )
              </option>
              <option value="Cardiologist">
                Cardiologist ( হৃদরোগ বিশেষজ্ঞ )
              </option>
              <option value="Nephrologist">
                Nephrologist ( কিডনি রোগ বিশেষজ্ঞ )
              </option>
              <option value="Homoeopath">
                Homoeopath ( হোমিওপ্যাথি বিশেষজ্ঞ )
              </option>
              <option value="Physiotherapist">
                Physiotherapist ( ফিজিওথেরাপিস্ট )
              </option>
              <option value="ENT Specialist">
                ENT Specialist ( নাক, কান, গলা বিশেষজ্ঞ )
              </option>
              <option value="Diabetes & Thyroid Specialist">
                Diabetes & Thyroid Specialist ( সুগার ও থাইরয়েড রোগ বিশেষজ্ঞ )
              </option>
              <option value="Orthopedic">
                Orthopedic ( মেরুদণ্ড ও হাড় রোগ বিশেষজ্ঞ )
              </option>
              <option value="Ophthalmologist">
                Ophthalmologist ( চক্ষু রোগ বিশেষজ্ঞ )
              </option>
              <option value="Urologist">
                Urologist (ইউরোলজিস্ট)
              </option>
            </select>
          </div>

          {/* Degree */}
          <div>
            <p>Degree</p>
            <input
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>

          <div>
            <p>Achievement</p>
            <input
              value={achievement}
              onChange={(e) => setaAchievement(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>

          <div>
            <p>City</p>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>

          {/* Address */}
          <div>
            <p>Address</p>
            <input
              value={adddress1}
              onChange={(e) => {
                setAddress1(e.target.value);
                setClinicId("");
                searchClinic(e.target.value);
              }}
              className="w-full border p-2 rounded mt-1"
              required
            />

            {showClinicList && clinicSuggestions.length > 0 && (
              <div className="border rounded mt-1 bg-white max-h-40 overflow-y-auto">
                {clinicSuggestions.map((clinic) => (
                  <p
                    key={clinic._id}
                    onClick={() => {
                      setAddress1(clinic.name);
                      setClinicId(clinic._id);
                      setShowClinicList(false);
                    }}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {clinic.name}
                  </p>
                ))}
              </div>
            )}

            <input
              value={adddress2}
              onChange={(e) => setAddress2(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              required
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                getCurrentLocationLink();
              }}
              className="px-5 py-2 rounded bg-blue-500 text-white mt-2"
            >
              Google map Location
            </button>
          </div>

          {/* Manager Contacts */}
          <div>
            <p className="">Manager Contact Numbers</p>

            {managerContacts.map((contact, index) => (
              <div key={index} className="flex gap-3 mb-3">
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => {
                    const updated = [...managerContacts];
                    updated[index] = e.target.value;
                    setManagerContacts(updated);
                  }}
                  className="w-full border p-2 rounded mt-1"
                />

                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const updated = managerContacts.filter(
                        (_, i) => i !== index,
                      );
                      setManagerContacts(updated);
                    }}
                    className="bg-red-500 text-white px-3 rounded"
                  >
                    X
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => setManagerContacts([...managerContacts, ""])}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add More
            </button>
          </div>

          {/* About */}
          <div>
            <p>About doctor</p>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              rows={4}
              required
            />
          </div>
        </div>

        <div className="mt-6 border p-5 rounded">
          <p className="font-semibold text-lg mb-4">Weekly Availability</p>

          {weeklyAvailability.map((item, index) => (
            <div key={index} className="border p-4 mb-4 rounded">
              {/* Day */}
              <div className="mb-3">
                <p>Day</p>
                <select
                  value={item.day}
                  onChange={(e) => {
                    const updated = [...weeklyAvailability];
                    updated[index].day = e.target.value;
                    setWeeklyAvailability(updated);
                  }}
                  className="border p-2 rounded w-60"
                >
                  <option value="">Select Day</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
              </div>

              {/* Start & End Time */}
              <div className="flex flex-col sm:flex-row gap-4 mb-3">
                {" "}
                <div>
                  <p>Start Time</p>
                  <input
                    type="time"
                    value={item.startTime}
                    onChange={(e) => {
                      const updated = [...weeklyAvailability];
                      updated[index].startTime = e.target.value;
                      setWeeklyAvailability(updated);
                    }}
                    className="border p-2 rounded"
                  />
                </div>
                <div>
                  <p>End Time</p>
                  <input
                    type="time"
                    value={item.endTime}
                    onChange={(e) => {
                      const updated = [...weeklyAvailability];
                      updated[index].endTime = e.target.value;
                      setWeeklyAvailability(updated);
                    }}
                    className="border p-2 rounded"
                  />
                </div>
              </div>

              {/* Recurrence Type */}
              <div className="mb-3">
                <p>Recurrence Type</p>
                <select
                  value={item.recurrenceType}
                  onChange={(e) => {
                    const updated = [...weeklyAvailability];
                    updated[index].recurrenceType = e.target.value;
                    setWeeklyAvailability(updated);
                  }}
                  className="border p-2 rounded w-60"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="interval">Interval</option>
                </select>
              </div>

              {/* Monthly Week Numbers */}
              {item.recurrenceType === "monthly" && (
                <div className="mb-3">
                  <p>Select Week Positions</p>

                  {["first", "second", "third", "fourth", "fifth", "last"].map(
                    (pos) => (
                      <label key={pos} className="mr-4">
                        <input
                          type="checkbox"
                          checked={item.weekPositions?.includes(pos)}
                          onChange={(e) => {
                            const updated = [...weeklyAvailability];

                            if (!updated[index].weekPositions) {
                              updated[index].weekPositions = [];
                            }

                            if (e.target.checked) {
                              updated[index].weekPositions.push(pos);
                            } else {
                              updated[index].weekPositions = updated[
                                index
                              ].weekPositions.filter((p) => p !== pos);
                            }

                            setWeeklyAvailability(updated);
                          }}
                        />
                        <span className="ml-1 capitalize">{pos}</span>
                      </label>
                    ),
                  )}
                </div>
              )}

              {/* Interval Settings */}
              {item.recurrenceType === "interval" && (
                <div className="mb-3">
                  <p>Interval (Every X Days)</p>
                  <input
                    type="number"
                    placeholder="Enter interval days"
                    value={item.interval}
                    onChange={(e) => {
                      const updated = [...weeklyAvailability];
                      updated[index].interval = Number(e.target.value);
                      setWeeklyAvailability(updated);
                    }}
                    className="border p-2 rounded w-40"
                  />

                  <p className="mt-2">Start Date</p>
                  <input
                    type="date"
                    value={item.startDate}
                    onChange={(e) => {
                      const updated = [...weeklyAvailability];
                      updated[index].startDate = e.target.value;
                      setWeeklyAvailability(updated);
                    }}
                    className="border p-2 rounded"
                  />
                </div>
              )}

              {/* Remove Button */}
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setWeeklyAvailability(
                      weeklyAvailability.filter((_, i) => i !== index),
                    )
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setWeeklyAvailability([
                ...weeklyAvailability,
                {
                  day: "",
                  startTime: "",
                  endTime: "",
                  recurrenceType: "weekly",
                  weekNumbers: [],
                  interval: "",
                  startDate: "",
                },
              ])
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Add Availability
          </button>
        </div>

        <button
          type="submit"
          disabled={submitLoading}
          className={`bg-primary px-5 py-2 rounded-full text-white mt-5 ${submitLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-600"}`}
        >
          {submitLoading ? (
            <span className="flex items-center justify-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin text-white text-xl" />
              {isEdit ? "Updating..." : "Adding..."}
            </span>
          ) : isEdit ? (
            "Update Doctor"
          ) : (
            "Add Doctor"
          )}
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
