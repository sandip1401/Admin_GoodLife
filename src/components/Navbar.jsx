import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
    const {aToken,setAToken}=useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)
    const logout=()=>{
        // Admin logout
    if (aToken) {
        setAToken('')
        localStorage.removeItem('aToken')
    }

    // Doctor logout
    if (dToken) {
        setDToken('')
        localStorage.removeItem('dToken')
    }
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-sm'>
            <p className='font-bold text-3xl text-blue-700'>GoodLife</p>
            <p className='border px-2 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin':'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-primary px-7 py-2 text-white rounded hover:scale-105 transition-all active:scale-95'>Logout</button>
    </div>
  )
}

export default Navbar