import React, { useContext, useState } from 'react'
import AdminContextProvider, { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {setAToken,backendUrl}=useContext(AdminContext)

    const onSubmitHandler=async(event)=>{
        event.preventDefault()
        try{
            if(state==='Admin'){
                const {data}=await axios.post(backendUrl+'/api/admin/login',{email,password})
                if(data.success){
                    console.log("valid token")
                    setAToken(data.token);
                    localStorage.setItem('aToken',data.token)
                }
                else{
                    toast.error(data.message)
                }
            }
            else{
                
            }
        }
        catch(err){

        }
    }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-500 shadow-lg'>
            <p className='text-2xl m-auto'><span className='text-primary font-semibold'>{state}</span> Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full border border-zinc-300 rounded py-1 mt-1 pl-2' type="email" required />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full border border-zinc-300 rounded py-1 pl-2 mt-1' type="password" required />
            </div>
            <button className='bg-primary w-full py-2 rounded text-white cursor-pointer mt-2 active:scale-95 transition-all'>Login</button>
            {
                state==='Admin'
                ?<p>Doctor Login? <span className='text-blue-700 underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span></p>
                :<p>Admin Login? <span className='text-blue-700 underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p>
            }
        </div>
    </form>
  )
}

export default Login