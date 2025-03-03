import React from "react";

function Navbar() {

  return (
    <div className="px-10 py-4 shadow-md">
      <nav className="flex justify-between items-center ml-10 mr-10">
        {/* Brand Name */}
        <div className="text-xl font-bold">
          <a href="/admin/home" className="text-gray-600 hover:text-gray-800">ReadRite</a>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <a href="/admin/home" className="text-gray-600 hover:text-gray-800 font-bold uppercase">Home</a>
          </li>

          <li>
            <a href="/admin/add" className="text-gray-600 hover:text-gray-800 font-bold uppercase">Add</a>
          </li>

          <li>
            <a href="/admin/search" className="text-gray-600 hover:text-gray-800 font-bold uppercase">Search</a>
          </li>

          <li>
            <a href="/admin/update" className="text-gray-600 hover:text-gray-800 font-bold uppercase">Update</a>
          </li>

          <li>
            <a href="/admin/delete" className="text-gray-600 hover:text-gray-800 font-bold uppercase">Delete</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
