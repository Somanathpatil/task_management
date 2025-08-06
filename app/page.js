"use client"
import React from 'react'
import Login from './Login/page'
import AddAgent from './AddAgent/page'
import { useRouter } from 'next/navigation'


export default function Page() {
  const route = useRouter()
  const handelClick = () => {
    route.push('/Login')
  }
  return (
    <>

       <section className='h-screen flex justify-center items-center bg-black'>
        <button type="button" onClick={handelClick} className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Go to Login</button>

       </section>
    
    
    </>
  )
}
