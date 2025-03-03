import React from 'react';

function AdminRegister() {
  return (
    <div className="login"
      style={{
        backgroundImage: "url('../background/adminreg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="loginform">
        {/* Left Section */}
        <div className='left w-1/2 flex justify-center'>
            <img src="../imgs/adminreg.png" alt="Admin Login" className='w-full' />
        </div>

        {/* Right Section - Image */}
        <div className='right w-1/2 text-center'>

          <h2 className='text-5xl font-bold mb-10'>Registration</h2>

          <form className='mt-5 flex flex-col items-center'>
            <input type="text" placeholder="Name" className='w-full h-10 pl-2 mb-5 border rounded-md required' />
            <input type="text" placeholder="Email" className='w-full h-10 pl-2 mb-5 border rounded-md required' />
            <input type="password" placeholder="Password" className='w-full h-10 pl-2 mb-5 border rounded-md required' />
            <input type='text' placeholder='Phone Number' className='w-full h-10 pl-2 mb-5 border rounded-md required' />
            <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'>
              Login
            </button>

            <p className='mt-5 text-xl'>Already have an account? <a href='/admin/login' className='text-blue-500'>Login</a></p>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
