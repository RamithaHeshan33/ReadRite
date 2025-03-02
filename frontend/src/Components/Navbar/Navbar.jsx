import React from 'react'

function Navbar() {
  return (
    <div className="px-10 py-4 shadow-md">
      <nav className="flex justify-between items-center ml-10 mr-10">
        <div className="text-xl font-bold">
          <a href="/" className="text-gray-600 hover:text-gray-800">ReadRite</a>
        </div>
        <ul className="flex space-x-6">
          <li>
            <a href="/" className="text-gray-600 hover:text-gray-800 font-bold">Home</a>
          </li>
          <li>
            <a href="/login" className="text-gray-600 hover:text-gray-800 font-bold">Login</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
