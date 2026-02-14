import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
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
  const [managerContacts, setManagerContacts] = useState([""]);
  const [adddress1, setAddress1] = useState("");
  const [adddress2, setAddress2] = useState("");

  // ✅ Weekly Availability State
  const [weeklyAvailability, setWeeklyAvailability] = useState([
    { day: "", startTime: "", endTime: "" },
  ]);

  const { backendUrl, aToken } = useContext(AdminContext);

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

    try {
      if (!docImg) {
        return toast.error("Image not Selected");
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
      formData.append("address1", adddress1);
      formData.append("address2", adddress2);
      formData.append("education", education);

      // ✅ send availability as JSON string
      formData.append("weeklyAvailability", JSON.stringify(weeklyAvailability));

      formData.append("managerContacts", JSON.stringify(managerContacts));

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } },
      );

      if (data.success) {
        toast.success(data.message);

        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setSpeciality("");
        setDegree("");
        setExperience("");
        setAbout("");
        setFees("");
        setAddress1("");
        setAddress2("");
        setEducation("");
        setWeeklyAvailability([{ day: "", startTime: "", endTime: "" }]);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded-md w-full max-w-4xl">
        {/* Image Upload */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>Upload doctor picture</p>
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
              required
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
            </select>
          </div>

          {/* Fees */}
          <div>
            <p>Fees</p>
            <input
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              type="number"
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
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
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


          {/* Address */}
          <div>
            <p>Address</p>
            <input
              value={adddress1}
              onChange={(e) => setAddress1(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              required
            />
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



        {/* ✅ WEEKLY AVAILABILITY SECTION */}
        <div className="mt-6">
          <p className="font-medium mb-3">Weekly Availability (24hr format)</p>

          {weeklyAvailability.map((item, index) => (
            <div key={index} className="flex gap-3 mb-3">
              <select
                value={item.day}
                onChange={(e) => {
                  const updated = [...weeklyAvailability];
                  updated[index].day = e.target.value;
                  setWeeklyAvailability(updated);
                }}
                className="border p-2 rounded"
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

              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const updated = weeklyAvailability.filter(
                      (_, i) => i !== index,
                    );
                    setWeeklyAvailability(updated);
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
            onClick={() =>
              setWeeklyAvailability([
                ...weeklyAvailability,
                { day: "", startTime: "", endTime: "" },
              ])
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add More
          </button>
        </div>

        <button
          type="submit"
          className="bg-primary px-5 py-2 rounded-full text-white mt-5"
        >
          Add doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
