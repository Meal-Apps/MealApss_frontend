import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='bg-gradient-to-r from-indigo-400 to-cyan-400'>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex space-x-8">
          <Link to="/user/dashboard" className="px-8 py-4 text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg inline-block text-center">
            User Login
          </Link>
          <Link to="/manager/dashboard" className="px-8 py-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg inline-block text-center">
            Manager Login
          </Link>
        </div>
      </div>

      


    </div>
  )
}

export default Home