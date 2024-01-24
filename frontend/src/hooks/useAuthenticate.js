import { useState } from 'react';

export default function useAuthenticate() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const authenticate = async () => {
        const res = await fetch('http://localhost:3001/users/authenticate', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-type': 'application/json',
          },
        });

        const responseObject = await res.json();

        if (responseObject) {
          setIsLoggedIn(true);
          setUser(responseObject.data);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem('token');
        }
      };

      authenticate();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return [isLoggedIn, setIsLoggedIn];
}
