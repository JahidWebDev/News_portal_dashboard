import React from 'react'
import { Link } from 'react-router-dom'
import NewsContent from '../../content/NewsContent'

const News = () => {
  const userInfo = {
    role: "admin"
  }


  return (
    <div className=' bg-white rounded-md'>
        <div className=' flex justify-between p-4'>
             <h2 className=' text-xl font-medium'>News</h2>
           {
            userInfo.role !== "admin" &&   <Link className=' px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600' to="/dashboard/news/create">Create News</Link>
           }
        </div>
        <NewsContent/>
    </div>
  )
}

export default News   