import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove admin token from local storage
    localStorage.removeItem('UserTocken');

    // Redirect to login page after logout
    navigate('/user/login');
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
        
    </div>
  );
}

export default Logout;
