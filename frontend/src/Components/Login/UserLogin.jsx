import React, { useState, useEffect } from 'react';
import './adminLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('UserTocken');
    if (token) {
      navigate('/user/home');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/user/login', formData);

      if (response.status === 200) {
        localStorage.setItem('UserTocken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user details
        navigate('/user/home');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Invalid email or password');
      } else {
        setError('Server error, please try again later.');
      }
    }
  };

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
          <h2 className='text-5xl font-bold mb-20'>User Login</h2>

          {error && <p className='text-red-500'>{error}</p>}

          <form onSubmit={handleSubmit} className='mt-5 flex flex-col items-center'>
            <input 
              name='email' 
              value={formData.email} 
              onChange={handleChange} 
              type="text" 
              placeholder="Email" 
              className='w-full h-10 pl-2 mb-5 border rounded-md' 
              required 
            />
            
            <input 
              name='password' 
              value={formData.password} 
              onChange={handleChange} 
              type="password" 
              placeholder="Password" 
              className='w-full h-10 pl-2 mb-5 border rounded-md' 
              required 
            />
            
            <button 
              type="submit" 
              className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'
            >
              Login
            </button>

            <p className='mt-5 text-xl'>
              Don't have an account? <a href='/user/register' className='text-blue-500'>Register</a>
            </p>
          </form>
        </div>

        {/* Right Section - Image */}
        <div className='right w-1/2 flex justify-center'>
          <img src="../imgs/userlog.png" alt="User Login" className='w-full' />
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
