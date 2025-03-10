import React, {useState} from 'react';
import axios from 'axios';

function UserRegister() {
  
  const [formData, setFormData] = useState ({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData ({
      ...formData, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/user/register', formData);

      if(response.status === 200) {
        setSuccess('Registration is Successful');
      }
    }

    catch(error) {
      setError(error.response?.data?.message || 'Something went wrong');
    }
  }

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
            <img src="../imgs/userreg.png" alt="Admin Login" className='w-full' />
        </div>

        {/* Right Section - Image */}
        <div className='right w-1/2 text-center'>

          <h2 className='text-5xl font-bold mb-10'>Registration</h2>

          {error && <p className='text-red-500'>{error}</p>}
          {success && <p className='text-green-500'>{success}</p>}

          <form onSubmit={handleSubmit} className='mt-5 flex flex-col items-center'>
            <input name='name' value={formData.name} onChange={handleChange} type="text" placeholder="Name" className='w-full h-10 pl-2 mb-5 border rounded-md required' />
            <input name='email' value={formData.email} onChange={handleChange} type="text" placeholder="Email" className='w-full h-10 pl-2 mb-5 border rounded-md required' />
            <input name='password' value={formData.password} onChange={handleChange} type="password" placeholder="Password" className='w-full h-10 pl-2 mb-5 border rounded-md required' />
            <input name='phone' value={formData.phone} onChange={handleChange} type='text' placeholder='Phone Number' className='w-full h-10 pl-2 mb-5 border rounded-md required' />
            <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'>
              Register
            </button>

            <p className='mt-5 text-xl'>Already have an account? <a href='/user/login' className='text-blue-500'>Login</a></p>

          </form>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
