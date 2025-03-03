import React from 'react';
import './AdminLogin.css';

function Adminlogin() {
  return (
    <div className="login"
      style={{
        backgroundImage: "url('../background/adminlog.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="loginform">
        {/* Left Section */}
        <div className='left w-1/2 text-center'>
          <h2 className='text-5xl font-bold mb-20'>Admin Login</h2>

          <form className='mt-5 flex flex-col items-center'>
            <input type="text" placeholder="Email" className='w-full h-10 pl-2 mb-5 border rounded-md' />
            <input type="password" placeholder="Password" className='w-full h-10 pl-2 mb-5 border rounded-md' />
            <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'>
              Login
            </button>

            <p className='mt-5 text-xl'>Don't have an account? <a href='/admin/register' className='text-blue-500'>Register</a></p>

          </form>
        </div>

        {/* Right Section - Image */}
        <div className='right w-1/2 flex justify-center'>
          <img src="../imgs/adminlogin.png" alt="Admin Login" className='w-full' />
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
