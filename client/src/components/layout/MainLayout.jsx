import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className=' min-w-screen min-h-screen bg-amber-50'>
        <Sidebar/>
        <Outlet />
    </div>
  )
}

export default MainLayout