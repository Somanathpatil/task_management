"use client"
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

export default function AddAgent() {

    const [email, setemail] = useState('');
    const [phoneNo, setphoneNo] = useState('');
    const [password, setpassword] = useState('');
    const [userName, setuserName] = useState('');
    const [countryCode, setCountryCode] = useState('+91')

    const handelSubmit = async(e) => {
        e.preventDefault();

        try{
            const res = await axios.post('/api/Agent', {email, password, userName, countryCode, phoneNo})
            if(res.status === 201 || res.data.status === 201){
                toast.success(res.data.message);
            }else{
                toast.error(res.data.message)
            }
            
                   

        }catch(err){
            toast.error(err);
        }
    }

    return (
        <>
            <section className="text-white h-screen flex justify-center items-center relative">
                {/* Background Grid */}
                <div className="absolute top-0 left-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>

                {/* Glass Effect Card */}
                <div className="bg-black/50 backdrop-blur-md p-6 rounded-lg shadow-lg flex flex-col gap-4">
                    <h1 className="text-5xl font-bold text-center">Add Agent</h1>

                    <form action="" onSubmit={handelSubmit} className="flex flex-col gap-4 p-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="">Name :</label>
                            <input type="text" required value={userName} onChange={(e) => setuserName(e.target.value)} className='border-2 border-gray-200 outline-none px-6 py-2 rounded-xl focus:scale-110 focus:border-orange-400 transition-all duration-500 delay-100' />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="">Email :</label>
                            <input type="email" required value={email} onChange={(e) => setemail(e.target.value)} className='border-2 border-gray-200 outline-none px-6 py-2 rounded-xl focus:scale-110 focus:border-orange-400 transition-all duration-500 delay-100' />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="">Password No :</label>
                            <input type="text" required value={password} onChange={(e) => setpassword(e.target.value)} className='border-2 border-gray-200 outline-none px-6 py-2 rounded-xl focus:scale-110 focus:border-orange-400 transition-all duration-500 delay-100' />
                        </div>

                        <label className="block mb-2">Phone Number</label>
                        <div className="flex gap-2">
                            <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="border p-2 rounded "
                            >
                                <option className='text-black' value="+91">🇮🇳 +91</option>
                                <option className='text-black' value="+1">🇺🇸 +1</option>
                                <option className='text-black' value="+44">🇬🇧 +44</option>
                            </select>

                            <input
                                type="tel"
                                placeholder="Enter phone number"
                                value={phoneNo}
                                onChange={(e) => setphoneNo(e.target.value)}
                                className="border p-2 rounded w-full"
                            />
                        </div>

                        <button type="submit" className="text-gray-900 my-6 outline-none bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl f font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add Agent</button>

                    </form>
                </div>
            </section>
        </>
    )
}
