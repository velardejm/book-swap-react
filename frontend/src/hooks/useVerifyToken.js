import { useEffect } from 'react';

export default function useVerifyToken() {
  let isTokenValid = false;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/authenticate', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        isTokenValid = true;
      } else {
        localStorage.removeItem('token');
      }
    };

    fetchData();
  }, []);

  return isTokenValid;
}
