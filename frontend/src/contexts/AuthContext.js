import { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      const authenticate = async () => {
        const res = await fetch('http://localhost:3001/users/authenticate', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-type': 'application/json',
          },
        });

        if (res.status === 200) {
          const responseObject = await res.json();
          setIsLoggedIn(true);
          setUser(responseObject.data);
          console.log(user);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem('token');
        }
      };

      authenticate();
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  const logOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};
