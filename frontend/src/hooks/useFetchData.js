import { useState, useEffect } from 'react';

export default function useFetchData(url) {
  const [data, setData] = useState(null);

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
        console.log(dataObject);
        setData(dataObject.data);
      } else {
        localStorage.removeItem('token');
      }
    };

    fetchData();
  }, [url]);

  return [data, setData];
}
