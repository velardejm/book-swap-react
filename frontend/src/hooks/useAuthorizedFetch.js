import { useState, useEffect } from 'react';

export default function useAuthorizedFetch(url) {
  const [data, setData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();

      setData(data);
    };

    loadData();
  }, [url]);

  return [data, setData];
}
