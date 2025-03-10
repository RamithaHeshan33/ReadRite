import React from "react";

function Navbar() {

  return (
    <div className="px-10 py-4 shadow-md">
      <nav className="flex justify-between items-center ml-10 mr-10">
        {/* Brand Name */}
        <div className="text-xl font-bold">
          <a href="/user/home" className="text-gray-600 hover:text-gray-800">ReadRite</a>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <a href="/user/home" className="text-gray-600 hover:text-gray-800 font-bold uppercase">Home</a>
          </li>

          <li>
            <a href="/user/rate" className="text-gray-600 hover:text-gray-800 font-bold uppercase">Rate</a>
          </li>

          <li>
            <a href="/user/logout" className="text-gray-600 hover:text-gray-800 font-bold uppercase">Logout</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
