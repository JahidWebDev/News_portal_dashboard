import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const MainLayout = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex'>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className='ml-[250px] flex-1 flex flex-col min-h-screen'>

        {/* Header */}
        <Header />

        {/* Content */}
        <main className='flex-1 p-6 bg-white/40 backdrop-blur-sm'>
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default MainLayout