import { useNavigate } from "react-router-dom";

const useNavigateProtectedRoute = (url) => {
    const navigate = useNavigate();
  
    const navigateProtectedRoute = async (url) => {
      const response = await fetch('http://localhost:3001/authenticate', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        navigate(url);
      } else {
        localStorage.removeItem('token');
        navigate('/login', { state: { from: url } });
      }
    };
  
    return navigateProtectedRoute;
  };

  export default useNavigateProtectedRoute;