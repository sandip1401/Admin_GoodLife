import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddClinic = () => {
  const { backendUrl, aToken } = useContext(AdminContext);

  const [clinicImg, setClinicImg] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [offer, setOffer] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("offer", offer);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("pincode", pincode);
      formData.append("image", clinicImg);

      const { data } = await axios.post(
        backendUrl + "/api/clinic/add",
        formData,
        { headers: { aToken } },
      );

      if (data.success) {
        toast.success(data.message);

        setName("");
        setAddress("");
        setCity("");
        setPincode("");
        setOffer("");
        setClinicImg(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5">
      <p className="mb-3 text-lg font-medium">Add Clinic</p>

      {/* Clinic Image Upload */}
      <div className="flex items-center gap-4 mb-6">
        <label htmlFor="clinic-img">
          <img
            className="w-16 h-16 bg-gray-100 rounded-full cursor-pointer object-cover"
            src={
              clinicImg
                ? URL.createObjectURL(clinicImg)
                : "https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
            }
            alt=""
          />
        </label>

        <input
          type="file"
          id="clinic-img"
          hidden
          onChange={(e) => setClinicImg(e.target.files[0])}
        />

        <p>Upload Clinic Picture</p>
      </div>

      {/* Clinic Name */}
      <div className="flex flex-col gap-1 mb-4">
        <p>Clinic Name</p>
        <input
          className="border rounded px-3 py-2"
          type="text"
          placeholder="Enter clinic name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Address */}
      <div className="flex flex-col gap-1 mb-4">
        <p>Address</p>
        <input
          className="border rounded px-3 py-2"
          type="text"
          placeholder="Clinic address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      {/* City */}
      <div className="flex flex-col gap-1 mb-4">
        <p>City</p>
        <select
          className="border rounded px-3 py-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        >
          <option value="">Select City</option>
          <option value="Rampurhat">Rampurhat</option>
          <option value="Bolpur">Bolpur</option>
          <option value="Sainthia">Sainthia</option>
          <option value="Suri">Suri</option>
        </select>
      </div>

      {/* Pincode */}
      <div className="flex flex-col gap-1 mb-4">
        <p>Pincode</p>
        <input
          className="border rounded px-3 py-2"
          type="number"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <p>Any Offer</p>
        <input
          className="border rounded px-3 py-2"
          type="text"
          placeholder="Enter offer's details"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="bg-primary px-6 py-2 text-white rounded">
        Add Clinic
      </button>
    </form>
  );
};

export default AddClinic;
