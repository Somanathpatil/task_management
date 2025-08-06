"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const route = useRouter();
    const login = () => {
        route.push("/Login")
    }
    const addAgent = () => {
        route.push("/AddAgent")
    }
    const upload = () => {
        route.push("/Upload")
    }
    const task = () => {
        route.push("/Tasks")
    }
    return (
        <>
        
            <div className='bg-[#0801030e] w-screen fixed z-30 top-0 p-2 '>
                <div className='flex  bg-[#0801030e] justify-center space-x-2.5 items-center'>
                    <button onClick={login}
                        className='p-2 bg-green-300 rounded-2xl '>
                        Login
                    </button>
                    <button onClick={addAgent}
                        className='p-2 bg-green-300 rounded-2xl'>
                        Add Agent
                    </button>
                    <button onClick={upload}
                        className='p-2 bg-green-300 rounded-2xl'>
                        Upload
                    </button>
                    <button onClick={task}
                        className='p-2 bg-green-300 rounded-2xl'>
                        Task
                    </button>
                </div>


            </div>
        </>
    )
}

export default Navbar


