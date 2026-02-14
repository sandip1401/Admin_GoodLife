import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { ImCancelCircle } from "react-icons/im";

const Appoinments = () => {
  const {aToken, appointments, getAllAppointments,cancelAppointment}=useContext(AdminContext)
  const {calculateAge,currency} = useContext(AppContext)

  const formatSlotDate=(slotDate)=>{
  if(!slotDate){
    return "";
  }
  const [day,month,year]=slotDate.split("_");
  const date=new Date(year,month-1,day);

  return date.toLocaleDateString("en-IN",{
    day:"2-digit",
    month:"long",
    year:"numeric",
  })
}

  useEffect(()=>{
    if(aToken){
      getAllAppointments()
    }
  },[aToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[80vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1.4fr_3fr_3fr_1.3fr_0.5fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No appointments found
          </p>
        )}

        {appointments.map((item,index)=>{
          return(
          <div className='flex flex-col gap-2 sm:grid sm:grid-cols-[0.1fr_3fr_0.2fr_3fr_3.5fr_1.2fr_0.5fr] sm:gap-x-6 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={item._id}>
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'> 
              <img className='w-8 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:'>{calculateAge(item.userData.dob)}</p>
            <p className='text-center'>{formatSlotDate(item.slotDate)} | {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt="" /> <p>{item.docData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {
              item.cancelled ? <p className='text-red-500 border border-red-500 px-3 py-1 rounded '>Cancelled</p>
              :<p onClick={()=>cancelAppointment(item._id)} className='text-2xl text-red-500 cursor-pointer'><ImCancelCircle /></p>

            }
          </div>
          )
        })}
      
      </div>
    </div>
      
  )
}

export default Appoinments