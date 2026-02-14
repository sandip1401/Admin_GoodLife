import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorList = () => {
  const {doctors,aToken,getAllDoctors,changeAvailability}=useContext(AdminContext)
  useEffect(()=>{
    if(aToken){
      getAllDoctors()
    }
  },[aToken])
  return (
    <div className='m-5'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item,index)=>{
            return(
            <div className=' border border-indigo-200 rounded-xl max-w-56 cursor-pointer overflow-hidden' key={index}>
              <img className=' hover:bg-blue-500 transition-all duration-300' src={item.image} alt="" />
              <p className='pl-3'>{item.name}</p>
              <p className='pl-3'>{item.speciality}</p>
              <div className='flex gap-1 pl-3 mb-1'>
                <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>
            </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default DoctorList