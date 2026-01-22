import React from 'react'
import { Link } from 'react-router-dom'
import { CiSquarePlus } from "react-icons/ci";

const Navbar = ({colorMode, setColorMode}) => {

  const toggleColorMode = () => {
    setColorMode(prev=>!prev)
  }

  return (
    <nav className='w-full px-96 mt-6'>
      <div className='flex h-16 items-center justify-between flex-direct sm:flex-row '>   

        <Link className='h-full text-4xl  bg-linear-to-r from-cyan-400 to-blue-500 inline-block text-transparent bg-clip-text' to={"/"}>Product Store 🛒</Link>

        <div className='flex h-full w-28  justify-between items-center'>
            <Link to={'/create'}>
                <button className={`w-12 h-12 flex justify-center items-center  p-2 rounded-sm ${colorMode ? "bg-gray-600 text-white" : "bg-gray-200 text-black"}`}>
                    <CiSquarePlus className='h-full w-full'/>
                </button>
            </Link>
            
            <button onClick={toggleColorMode} className={`w-12 h-12 flex justify-center items-center p-6 rounded-sm ${colorMode ? "bg-gray-600 text-white" : "bg-gray-200 text-black"}`}>
              {colorMode === true ? "☀️" : "🌙"}
            </button>
        
        </div>

      </div>
    </nav>
  )
}

export default Navbar
