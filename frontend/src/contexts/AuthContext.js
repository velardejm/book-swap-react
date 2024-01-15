import { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const authenticate = async () => {
        const res = await fetch('http://localhost:3001/authenticate', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-type': 'application/json',
          },
        });

        const responseObject = await res.json();

        if (responseObject) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(true);
          localStorage.removeItem('token');
        }
      };

      authenticate();
    }
  }, [isLoggedIn]);

  const logIn = async (formData) => {

    const res = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
      return true;
    } else {
      alert(data.message);
      return false;
    }

    setIsLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    //setUser to null
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
