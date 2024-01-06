import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAuthorizedFetch(url) {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      // Check if token/session is still valid
      const checkSession = async () => {
        const response = await fetch('http://localhost:3001/authenticate', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.status === 200) {
          return true;
        } else {
          return false;
        }
      };
      const isSessionValid = await checkSession();

      // If session is valid, fetch data
      if (isSessionValid) {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setData(data);
      } else {
        navigate('/login', {
          state: {
            from: "/listings"
          }
        });
      }

    };

    loadData();
  }, [url]);

  return [data, setData];
}
