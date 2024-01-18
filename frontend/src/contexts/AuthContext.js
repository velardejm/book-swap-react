import { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState();

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
  }, [isLoggedIn]);

  const logOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, logOut, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
