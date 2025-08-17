"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

export default function Login() {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const route = useRouter();

  const handelSubmit = async(e) => {
    e.preventDefault();
      try{
        const res = await axios.post('https://taskmanagement-navy-nine.vercel.app/api/Login', {email, password})
                if(res.status === 201){
                  toast.success(res.data.message);
                  
                 setTimeout(() => {
                    route.push('/AddAgent');
                 }, 1000);
                 
                }else{
                  toast.error(res.data.message);
                }
              
      }catch(err){
          toast.error(err)
          
      }
    console.log(email, password);
  }

  return (
    <>
      
        <section className="h-screen flex justify-center items-center text-white">
              <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>

            <form action="" onSubmit={handelSubmit} className="border-2 border-white p-20 rounded-3xl">
                <h1 className="font-bold text-5xl text-center bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent my-6">Log In</h1>

               <div className="flex flex-col gap-10">
                 <div className="flex flex-col gap-2">
                  <label htmlFor="" className="">Email :</label>
                  <input type="text" required value={email} onChange={(e) => setemail(e.target.value)} className='border-2 border-gray-200 outline-none px-6 py-2 rounded-xl focus:scale-110 focus:border-orange-400 transition-all duration-500 delay-100' />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="">Password :</label>
                  <input type="text" required value={password} onChange={(e) => setpassword(e.target.value)} className='border-2 border-gray-200 outline-none px-6 py-2 rounded-xl focus:scale-110 focus:border-orange-400 transition-all duration-500 delay-100' />
                </div>

                <button type="submit" className="text-gray-900 outline-none bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl f font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>

               </div>
            </form>
        </section>
    
    </>
  )
}
