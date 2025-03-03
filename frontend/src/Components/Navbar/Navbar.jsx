import React, { useState } from "react";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="px-10 py-4 shadow-md">
      <nav className="flex justify-between items-center ml-10 mr-10">
        {/* Brand Name */}
        <div className="text-xl font-bold">
          <a href="/" className="text-gray-600 hover:text-gray-800">ReadRite</a>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <a href="/" className="text-gray-600 hover:text-gray-800 font-bold">Home</a>
          </li>

          {/* Login Dropdown */}
          <li className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-600 hover:text-gray-800 font-bold focus:outline-none cursor-pointer"
            >
              Login
            </button>

            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-30 bg-white border rounded-lg shadow-lg">
                <li>
                  <a
                    href="/user/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    User
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Admin
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
