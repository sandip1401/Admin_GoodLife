import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AddClinic = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const { backendUrl, aToken, clinics, getAllClinics } = useContext(AdminContext);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [clinicImg, setClinicImg] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [offer, setOffer] = useState("");

  useEffect(() => {
    if (!isEdit) return;

    const loadClinic = async () => {
      const existingClinic = clinics.find((clinic) => clinic._id === id);

      if (existingClinic) {
        setName(existingClinic.name || "");
        setAddress(existingClinic.address || "");
        setCity(existingClinic.city || "");
        setPincode(existingClinic.pincode || "");
        setOffer(existingClinic.offer || "");
        setClinicImg(existingClinic.image || false);
        return;
      }

      try {
        const { data } = await axios.get(backendUrl + "/api/clinic/" + id, {
          headers: { aToken },
        });

        if (data.success && data.clinic) {
          const clinic = data.clinic;
          setName(clinic.name || "");
          setAddress(clinic.address || "");
          setCity(clinic.city || "");
          setPincode(clinic.pincode || "");
          setOffer(clinic.offer || "");
          setClinicImg(clinic.image || false);
        } else {
          toast.error(data.message || "Clinic not found");
          navigate("/clinic-list");
        }
      } catch (error) {
        toast.error(error.message);
        navigate("/clinic-list");
      }
    };

    loadClinic();
  }, [id, isEdit, clinics, aToken, backendUrl, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("offer", offer);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("pincode", pincode);
      if (clinicImg instanceof File) {
        formData.append("image", clinicImg);
      }

      const url = isEdit
        ? backendUrl + "/api/clinic/update/" + id
        : backendUrl + "/api/clinic/add";

      const { data } = await axios.post(url, formData, {
        headers: { aToken },
      });

      if (data.success) {
        toast.success(data.message);

        if (isEdit) {
          navigate("/clinic-list");
        } else {
          setName("");
          setAddress("");
          setCity("");
          setPincode("");
          setOffer("");
          setClinicImg(false);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5">
      <p className="mb-3 text-lg font-medium">
        {isEdit ? "Edit Clinic" : "Add Clinic"}
      </p>

      {/* Clinic Image Upload */}
      <div className="flex items-center gap-4 mb-6">
        <label htmlFor="clinic-img">
          <img
            className="w-16 h-16 bg-gray-100 rounded-full cursor-pointer object-cover"
            src={
              clinicImg
                ? clinicImg instanceof File
                  ? URL.createObjectURL(clinicImg)
                  : clinicImg
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

      <button
        type="submit"
        disabled={submitLoading}
        className={`bg-primary px-6 py-2 text-white rounded ${submitLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-600"}`}
      >
        {submitLoading ? (
          <span className="flex items-center justify-center gap-2">
            <AiOutlineLoading3Quarters className="animate-spin text-white text-xl" />
            {isEdit ? "Updating..." : "Adding..."}
          </span>
        ) : isEdit ? (
          "Update Clinic"
        ) : (
          "Add Clinic"
        )}
      </button>
    </form>
  );
};

export default AddClinic;
