import React, {useState} from 'react';
import './AdminLogin.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Adminlogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/admin/admin/login', formData);

      if(response.status === 200) {
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin/home');
      }
    }

    catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    }
  }

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

          {error && <p className='text-red-500'>{error}</p>}

          <form className='mt-5 flex flex-col items-center' onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" name='email' value={formData.email} onChange={handleChange} className='w-full h-10 pl-2 mb-5 border rounded-md' />
            <input type="password" placeholder="Password" name='password' value={formData.password} onChange={handleChange} className='w-full h-10 pl-2 mb-5 border rounded-md' />
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
