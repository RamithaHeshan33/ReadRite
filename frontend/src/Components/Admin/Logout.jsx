import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove admin token from local storage
    localStorage.removeItem('adminToken');

    // Redirect to login page after logout
    navigate('/admin/login');
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
        
    </div>
  );
}

export default Logout;
