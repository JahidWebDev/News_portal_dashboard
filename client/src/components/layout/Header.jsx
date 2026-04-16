import React from 'react'
import profile from "../../assets/images/handsom.jpg"
import { FiSearch } from "react-icons/fi";
const Header = () => {
  return (
    <div className='pl-4 flex w-[calc(100vw-250px)] top-4 z-50'>
      <div className='w-full rounded-xl h-[70px] flex justify-between items-center px-6 bg-white shadow-sm border border-gray-100'>
        
<div className="relative w-[300px]">
  
  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

  <input
    type="text"
    placeholder="Search..."
    className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none border-gray-200 
    focus:border-green-500 focus:ring-1 focus:ring-green-500 h-10 text-sm transition"
  />

</div>

        {/* Right Side */}
        <div className='mr-2 flex items-center gap-3'>
          
          <div className='flex gap-x-2 items-center'>
            <div className='flex flex-col justify-center items-end leading-tight'>
              <span className='text-sm font-semibold text-gray-700'>
                Jahid Sheikh
              </span>
              <span className='text-xs text-gray-500'>
                Admin
              </span>
            </div>
          </div>

          <img 
            className='w-10 h-10 rounded-full object-cover border border-gray-200' 
            src={profile} 
            alt="profile" 
          />
        </div>

      </div>
    </div>
  )
}

export default Header