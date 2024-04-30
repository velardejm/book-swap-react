import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

export default function useAuthorizedFetch(url) {
  const [data, setData] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        const dataObject = await response.json();
        setData(dataObject.data);
      } else {
        localStorage.removeItem('token');
        alert('Please log in.');
        // navigate('/login');
      }
    };

    fetchData();
  }, []);

  return [data, setData];
}
